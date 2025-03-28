import express from "express";
import type { RequestHandler } from "express";
import dotenv from "dotenv";
import axios from "axios";
import qs from "qs";
import { auth } from "../config/firebase";
import { db } from "../config/firebase";

dotenv.config();

export const kakaoRouter = express.Router();
const usedCodes = new Set<string>();

const kakao = {
  CLIENT_ID: process.env.KAKAO_ID,
  REDIRECT_URI: process.env.REDIRECT_URI,
};

const handleKakaoAuth: RequestHandler = async (req, res, next) => {
  try {
    console.log("Received code:", req.body.code);

    // 이미 처리된 코드인지 확인
    if (usedCodes.has(req.body.code)) {
      res.status(400).json({
        error: "Authorization code already used",
      });
      return;
    }
    usedCodes.add(req.body.code);

    // 1. 액세스 토큰 받기
    let token;
    try {
      token = await axios({
        method: "POST",
        url: "https://kauth.kakao.com/oauth/token",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        data: qs.stringify({
          grant_type: "authorization_code",
          client_id: kakao.CLIENT_ID,
          redirect_uri: kakao.REDIRECT_URI,
          code: req.body.code,
        }),
      });
      console.log("Kakao token received:", token.data);
    } catch (error: any) {
      console.error(
        "Error getting Kakao token:",
        error.response?.data || error
      );
      throw new Error("Failed to get Kakao token");
    }

    // 2. 사용자 정보 가져오기
    let userInfo;
    try {
      userInfo = await axios({
        method: "GET",
        url: "https://kapi.kakao.com/v2/user/me",
        headers: {
          Authorization: `Bearer ${token.data.access_token}`,
        },
      });
      console.log("Kakao user info received:", userInfo.data);
    } catch (error: any) {
      console.error(
        "Error getting Kakao user info:",
        error.response?.data || error
      );
      throw new Error("Failed to get Kakao user info");
    }

    // 3. 사용자 정보 처리
    const userData = {
      id: userInfo.data.id,
      nickname: userInfo.data.properties?.nickname || "Unknown",
      email:
        userInfo.data.kakao_account?.email || `${userInfo.data.id}@kakao.user`,
      profileImage: userInfo.data.properties?.profile_image || "",
      provider: "kakao",
    };

    console.log("Processed user data:", userData);

    // Firebase Custom Token 생성
    let firebaseToken;
    try {
      firebaseToken = await auth.createCustomToken(String(userData.id), {
        email: userData.email,
        displayName: userData.nickname,
        photoURL: userData.profileImage,
        provider: "kakao",
      });
      console.log("Firebase token created");
    } catch (error: any) {
      console.error("Error creating Firebase token:", error);
      throw new Error("Failed to create Firebase token");
    }

    // 사용자 정보를 Firestore에 저장/업데이트
    try {
      const userRef = db.collection("users").doc(String(userData.id));
      const userDoc = await userRef.get();
      const existingData = userDoc.exists ? userDoc.data() : {};
      const tutorialCompleted = existingData?.tutorialCompleted ?? false;

      await userRef.set(
        {
          email: userData.email,
          profileImage: userData.profileImage,
          provider: "kakao",
          tutorialCompleted,
        },
        { merge: true }
      );
      console.log("User data saved to Firestore");
    } catch (error: any) {
      console.error("Error saving user data to Firestore:", error);
      throw new Error("Failed to save user data");
    }

    // HTTP-Only 쿠키로 액세스 토큰 저장
    res.cookie("token", token.data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.json({
      userData,
      firebaseToken,
    });
  } catch (error: any) {
    console.error("Kakao login error:", error);

    // 구체적인 에러 메시지 반환
    const errorMessage =
      error.response?.data?.error_description ||
      error.response?.data?.error ||
      error.message ||
      "Unknown error occurred";

    res.status(500).json({
      error: "Failed to process Kakao login",
      message: errorMessage,
      details: error.response?.data || error.message,
    });
  }
};

const logout: RequestHandler = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.json({ message: "Logged out successfully", isAuthenticated: false });
};

kakaoRouter.post("/logout", logout);
kakaoRouter.post("/kakao", handleKakaoAuth);

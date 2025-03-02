import express from "express";
import type { RequestHandler } from "express";
import dotenv from "dotenv";
import axios from "axios";
import qs from "qs";

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
    const token = await axios({
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

    // 2. 사용자 정보 가져오기
    const userInfo = await axios({
      method: "GET",
      url: "https://kapi.kakao.com/v2/user/me",
      headers: {
        Authorization: `Bearer ${token.data.access_token}`,
      },
    });

    // 3. 사용자 정보 처리
    const userData = {
      id: userInfo.data.id,
      nickname: userInfo.data.properties?.nickname || "Unknown",
      email: userInfo.data.kakao_account?.email,
      profileImage: userInfo.data.properties?.profile_image || "",
      provider: "kakao",
    };

    // ✅ HTTP-Only 쿠키로 액세스 토큰 저장
    res.cookie("token", token.data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7일 유지
    });

    res.json({ userData });
  } catch (error: any) {
    console.error("Kakao login error:", error);
    if (error.response?.data?.error === "invalid_grant") {
      res.status(400).json({
        error: "Invalid or expired authorization code",
      });
      return;
    }
    res.status(500).json({
      error: "Failed to process Kakao login",
      details: error.response?.data || error.message,
    });
  }
};

const logout: RequestHandler = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, 
    sameSite: "lax", 
    maxAge: 7 * 24 * 60 * 60 * 1000, 
  });
  res.json({ message: "Logged out successfully", isAuthenticated: false });
};

kakaoRouter.post("/logout", logout);
kakaoRouter.post("/kakao", handleKakaoAuth);

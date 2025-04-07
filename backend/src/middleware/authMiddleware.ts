import { Request, Response, NextFunction } from "express";
import axios from "axios";
import admin from "firebase-admin";
import { db } from "../config/firebase";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).send("Access Denied");
    return;
  }

  const [authType, token] = authHeader.split(" ");
  if (!token) {
    res.status(401).send("Access Denied");
    return;
  }

  try {
    let uid: string | null = null;
    let userData: any = null;

    if (authType === "Bearer") {
      // Firebase 인증
      const decodedToken = await admin.auth().verifyIdToken(token);
      uid = decodedToken.uid;
    } else if (authType === "Kakao") {
      // 카카오 로그인 처리
      const kakaoRes = await axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!kakaoRes.data || !kakaoRes.data.id) {
        throw new Error("Invalid Kakao token");
      }

      uid = `kakao_${kakaoRes.data.id}`;
      userData = {
        displayName: kakaoRes.data.properties?.nickname || "Kakao User",
        email: kakaoRes.data.kakao_account?.email || "",
        photoURL: kakaoRes.data.properties?.profile_image || "",
        provider: "kakao",
      };

      // Firebase에 사용자 추가 (없으면 생성)
      const userRef = db.collection("users").doc(uid);
      const userDoc = await userRef.get();
      if (!userDoc.exists) {
        await userRef.set(userData);
      }
    }

    if (!uid) {
      res.status(401).send("Invalid Token");
      return;
    }

    // 사용자 정보 가져오기
    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      res.status(404).send("User not found");
      return;
    }

    // req.user에 사용자 정보 추가
    (req as any).user = { uid, ...userDoc.data() };

    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).send("Invalid Token");
  }
};

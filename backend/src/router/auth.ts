import express, { Request, Response, Router } from "express";
import { auth } from "../config/firebase";

const router: Router = express.Router();

// 클라이언트에서 받은 토큰을 검증하는 API
router.post("/auth", async (req: Request, res: Response): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(400).json({ success: false, message: "토큰이 없습니다." });
    return;
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);

    res.cookie("user_uid", decodedToken.uid, { httpOnly: true, secure: true });

    res.status(200).json({ success: true, uid: decodedToken.uid });
  } catch (error) {
    console.error("❌ 토큰 검증 실패:", error);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
});

export default router;

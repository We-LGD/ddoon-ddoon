import express, { Request, Response } from "express";
import { db } from "../config/firebase";
import { verifyToken } from "../middleware/authMiddleware";

const router = express.Router();

/**
 * [GET] Gool 리스트 가져오기
 */
router.get("/gool-list", verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.uid;

    const goolSnapshot = await db
      .collection("goolList")
      .where("userId", "==", userId)
      .get();

    const goolList = goolSnapshot.docs.map((doc) => ({
      idx: doc.id,
      ...doc.data(),
    }));

    res.json(goolList);
  } catch (error) {
    console.error("Error fetching gool list:", error);
    res.status(500).send("Error fetching gool list");
  }
});

export default router;

import express, { Request, Response } from "express";
import { db } from "../config/firebase";
import { verifyToken } from "../middleware/authMiddleware";

const router = express.Router();

/**
 * [GET] 튜토리얼 상태 가져오기
 * 사용자가 튜토리얼을 완료했는지 확인
 */
router.get(
  "/tutorial-status",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.uid;

      // 해당 사용자 문서에서 튜토리얼 완료 여부 확인
      const userRef = db.collection("users").doc(userId);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        res.status(404).send("User not found");
        return;
      }

      const { tutorialCompleted } = userDoc.data() as any; // 튜토리얼 완료 여부

      res.json({ tutorialCompleted });
    } catch (error) {
      console.error("Error fetching tutorial status:", error);
      res.status(500).send("Error fetching tutorial status");
    }
  }
);

/**
 * [PATCH] 튜토리얼 성공 상태 저장
 * 튜토리얼이 성공했는지 여부를 저장
 */
router.patch(
  "/tutorial-status",
  verifyToken,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user.uid;
      const { tutorialCompleted } = req.body;

      const userRef = db.collection("users").doc(userId);
      await userRef.update({
        tutorialCompleted: tutorialCompleted,
      });

      res.send("Tutorial completion status updated");
    } catch (error) {
      console.error("Error updating tutorial status:", error);
      res.status(500).send("Error updating tutorial status");
    }
  }
);

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

/**
 * [PATCH] 첫 클릭 상태 변경 (firstClick → true)
 * Click 버튼을 눌렀을 때 isClicked 상태 업데이트
 */
router.patch(
  "/gool/:idx",
  verifyToken,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { idx } = req.params;
      const { isClicked } = req.body;

      await db
        .collection("goolList")
        .doc(idx)
        .update({ isClicked: Boolean(isClicked) });
      res.send("Gool click status updated");
    } catch (error) {
      console.error("Error updating gool click status:", error);
      res.status(500).send("Error updating gool click status");
    }
  }
);

export default router;

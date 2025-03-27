import express, { Request, Response } from "express";
import { db } from "../config/firebase";
import { Challenge } from "../interface/firebase";
import { verifyToken } from "../middleware/authMiddleware";

const router = express.Router();

/**
 * [GET] 챌린지 목록 조회
 * 사용자의 모든 챌린지를 가져오고, 상태를 업데이트
 */
router.get(
  "/challenge",
  verifyToken,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user.uid;

      const snapshot = await db
        .collection("challenges")
        .where("userId", "==", userId)
        .orderBy("createdAt", "asc")
        .get();

      const batch = db.batch();

      const challenges: Challenge[] = snapshot.docs.map((doc: any) => {
        const challenge = { ...doc.data(), idx: doc.id } as Challenge;
        const lastSuccessDate = new Date(challenge.lastSuccessDate);
        const today = new Date();
        const timeDiff = today.getTime() - lastSuccessDate.getTime();

        // lastSuccessDate를 기준으로 24시간 이상 경과하면 fail 상태로 변경
        const result =
          challenge.result === "success"
            ? "success"
            : timeDiff > 24 * 60 * 60 * 1000
            ? "fail"
            : challenge.result;

        return {
          ...challenge,
          idx: doc.id,
          result,
        };
      });

      // 배치 커밋하여 모든 작업을 일괄 처리
      await batch.commit();

      console.log("Fetched Challenges:", challenges);
      res.json(challenges);
    } catch (error) {
      console.error("Error fetching challenges:", error);
      res.status(500).send("Error fetching challenges");
    }
  }
);

/**
 * [POST] 새로운 챌린지 생성
 * 새로운 챌린지를 생성하고 데이터베이스에 저장
 */
router.post("/challenge", verifyToken, async (req, res) => {
  const { title, memo, days } = req.body;
  const userId = (req as any).user.uid;

  try {
    const newChallenge = {
      userId,
      title,
      memo,
      days,
      successCount: 0,
      lastSuccessDate: "",
      result: "progress",
      isClicked: false,
      createdAt: new Date().toISOString(),
    };

    const docRef = await db.collection("challenges").add(newChallenge);
    res.status(201).send(`Challenge added with ID: ${docRef.id}`);
  } catch (error) {
    console.error("Error adding challenge:", error);
    res.status(500).send("Error adding challenge");
  }
});

const isAuthenticated = (
  req: Request
): req is Request & { user: { uid: string } } => {
  return (req as any).user?.uid !== undefined;
};

/**
 * [GET] 특정 챌린지 조회
 * 챌린지 ID로 특정 챌린지의 상세 정보를 조회
 */
router.get(
  "/challenge/:idx",
  verifyToken,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { idx } = req.params;

      if (!isAuthenticated(req)) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }

      const doc = await db.collection("challenges").doc(idx).get();

      if (!doc.exists) {
        console.log("Challenge not found for idx:", idx);
        res.status(404).send("Challenge not found");
        return;
      }

      const { createdAt, userId, ...filteredData } = doc.data() as any;

      res.json({ idx: doc.id, ...filteredData });
    } catch (error) {
      console.error("Error fetching challenge:", error);
      res.status(500).send("Error fetching challenge");
    }
  }
);

/**
 * [DELETE] 챌린지 삭제
 * 특정 챌린지와 관련된 goolList 데이터도 함께 삭제
 */
router.delete(
  "/challenge/:idx",
  verifyToken,
  async (req: Request, res: Response): Promise<void> => {
    const { idx } = req.params;

    // 인증되지 않은 사용자 처리
    if (!isAuthenticated(req)) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const userId = req.user.uid;

    try {
      // 해당 챌린지가 존재하는지 확인
      const challengeDoc = await db.collection("challenges").doc(idx).get();

      // 문서가 존재하지 않으면 404 반환
      if (!challengeDoc.exists) {
        res.status(404).json({ error: "Challenge not found" });
        return;
      }

      // 문서의 userId가 요청한 사용자의 UID와 일치하는지 확인
      const challengeData = challengeDoc.data();
      if (challengeData?.userId !== userId) {
        res.status(403).json({
          error: "Forbidden: You can only delete your own challenges",
        });
        return;
      }

      // 문서 삭제
      await db.collection("challenges").doc(idx).delete();
      res.status(200).send("Challenge deleted");
    } catch (error) {
      console.error("Error deleting challenge:", error);
      res.status(500).send("Error deleting challenge");
    }
  }
);

export default router;

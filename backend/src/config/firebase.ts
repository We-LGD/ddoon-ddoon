import * as admin from "firebase-admin";
import * as path from "path";

// Firebase Admin SDK 초기화
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(
      require(path.join(
        __dirname,
        "../../netlify/functions/firebaseServiceAccountKey.json"
      ))
    ),
  });
}

// Firebase Admin 객체들 (Firestore, Auth 등)
const db = admin.firestore();
const auth = admin.auth();

export { db, auth };

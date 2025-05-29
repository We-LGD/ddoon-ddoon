import * as admin from "firebase-admin";

// Firebase Admin SDK 초기화
if (admin.apps.length === 0) {
  const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Firebase Admin 객체들 (Firestore, Auth 등)
const db = admin.firestore();
const auth = admin.auth();

export { db, auth };

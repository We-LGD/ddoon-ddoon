import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/shared/utils/firebase';

const saveUserToFirestore = async () => {
  const user = auth.currentUser;
  if (!user) return;

  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      provider: user.providerData[0]?.providerId,
      createdAt: new Date(),
    });
  }
};

export default saveUserToFirestore;

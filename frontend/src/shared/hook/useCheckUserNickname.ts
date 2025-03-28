import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/shared/utils/firebase';

export const useCheckUserNickname = () => {
  const navigate = useNavigate();

  const checkUserNickname = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const nickname = userSnap.data().nickname || '';
      if (!nickname.trim() || nickname === 'Unknown') {
        navigate('/nickname-setup');
      } else {
        navigate('/challenge');
      }
    } else {
      navigate('/nickname-setup');
    }
  };

  return { checkUserNickname };
};

export default useCheckUserNickname;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import useInputStore from '@/shared/store/useInputStore';
import Input from '@/shared/components/atoms/Input';
import Button from '@/shared/components/atoms/Button';
import { db } from '@/shared/utils/firebase';

export default function NicknameSetup() {
  const { inputs } = useInputStore();
  const navigate = useNavigate();
  const auth = getAuth();
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [loginMethod, setLoginMethod] = useState<string | null>(null);

  const isButtonDisabled = !inputs.nickname || inputs.nickname.length === 0 || inputs.nickname.length > 10;

  const handleStart = async () => {
    if (!isButtonDisabled) {
      if (isButtonDisabled || loading || !userId || !loginMethod) return;
      setLoading(true);

      try {
        const userRef = doc(db, 'users', userId);
        await setDoc(userRef, { nickname: inputs.nickname }, { merge: true });
        navigate('/tutorial');
      } catch (error) {
        console.error(error);
        alert('닉네임 저장 중 오류가 발생했어요.');
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.providerData[0]?.providerId === 'password') {
          setLoginMethod('email');
        } else if (user.providerData[0]?.providerId === 'github.com') {
          setLoginMethod('github');
        }
        setUserId(user.uid);
      }
    });
  }, [auth]);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Input
        theme="tutorial"
        title="개미 뚠뚠이의 개미굴 이름을 지어주세요!"
        name="nickname"
        maxLength={10}
        placeholder="갓생뚠뚠"
        description="10자까지 입력할 수 있어요. (띄어쓰기 포함)"
      />
      <Button theme="tutorial" event={handleStart} cancel={isButtonDisabled}>
        시작하기
      </Button>
    </div>
  );
}

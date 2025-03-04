import { useNavigate } from 'react-router-dom';
import useInputStore from '@/shared/store/useInputStore';
import Input from '@/shared/components/atoms/Input';
import Button from '@/shared/components/atoms/Button';

export default function NicknameSetup() {
  const { inputs } = useInputStore();
  const navigate = useNavigate();

  const isButtonDisabled = !inputs.nickname || inputs.nickname.length === 0 || inputs.nickname.length > 10;

  const handleStart = () => {
    if (!isButtonDisabled) {
      //TODO: 데이터 확인용, 작업 후 삭제 예정
      console.log('닉네임:', inputs.nickname);
      navigate('/tutorial');
    }
  };

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

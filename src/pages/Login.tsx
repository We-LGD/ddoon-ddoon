import { useNavigate } from 'react-router-dom';
import { IoChatbubble } from 'react-icons/io5';

function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {/* TODO: 이미지 업로드 후 적용 예정 */}
      <p className="mb-[2rem]">뚠뚠로고</p>
      <button className="w-[27.375rem] h-[2.75rem] bg-[#FEE500] text-black font-bold rounded-[0.25rem] mb-[1rem]">
        <div className="flex items-center justify-center">
          <IoChatbubble className="mr-1 mb-1" />
          카카오로 시작하기
        </div>
      </button>
      <button className="w-[27.375rem] h-[2.75rem] bg-white text-black font-bold rounded-[0.25rem] border border-disabled mb-[1rem]">
        깃허브로 시작하기
      </button>
      <button className="text-[0.75rem] text-disabledHover" onClick={() => navigate('/nickname-setup')}>
        게스트로 입장하기 {'>'}
      </button>
    </div>
  );
}

export default Login;

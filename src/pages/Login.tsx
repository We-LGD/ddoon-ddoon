import { Link } from 'react-router-dom';
import { IoChatbubble } from 'react-icons/io5';
import { Images } from '@/shared/assets/images';

function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <img src={Images.뚠뚠로고} alt="뚠뚠로고" className="mb-[2rem]" />
      <button className="flex justify-center items-center w-[27.375rem] h-[2.75rem] bg-[#FEE500] text-black font-bold rounded-[0.25rem] mb-[1rem]">
        <IoChatbubble className="h-5 w-5 mr-1 mb-1" />
        <button>카카오로 시작하기</button>
      </button>
      <div className="flex justify-center items-center w-[27.375rem] h-[2.75rem] bg-white text-black font-bold rounded-[0.25rem] border border-disabled mb-[1rem]">
        <img src={Images.GithubLogo} className="h-5 mr-1 mb-1" />
        <button>깃허브로 시작하기</button>
      </div>
      <Link to="/nickname-setup" className="text-[0.75rem] text-disabledHover">
        게스트로 입장하기 {'>'}
      </Link>
    </div>
  );
}

export default Login;

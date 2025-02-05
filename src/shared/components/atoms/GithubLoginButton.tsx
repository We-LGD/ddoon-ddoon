import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { Images } from '@/shared/assets/images';
import { auth } from '@/utils/firebase';

export default function GithubLoginButton() {
  const navigate = useNavigate();
  const handleGithubLoginClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);

      navigate('/tutorial');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`flex-center  ${isMobile ? 'w-full' : 'w-[27.375rem]'} h-[2.75rem] bg-white text-black font-bold rounded-[0.25rem] border border-disabled cursor-pointer`}
      onClick={handleGithubLoginClick}
    >
      <img src={Images.GithubLogo} className="h-5 mr-1 mb-1" />
      <button>깃허브로 시작하기</button>
    </div>
  );
}

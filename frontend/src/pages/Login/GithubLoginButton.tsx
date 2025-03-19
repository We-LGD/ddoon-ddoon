import Cookies from 'js-cookie';
import { isMobile } from 'react-device-detect';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { Images } from '@/shared/assets/images';
import { auth } from '@/shared/utils/firebase';
import useCheckUserNickname from '@/shared/hook/useCheckUserNickname';
import saveUserToFirestore from '@/shared/utils/saveUserToFirestore';

export default function GithubLoginButton() {
  const { checkUserNickname } = useCheckUserNickname();

  const handleGithubLoginClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      if (user) {
        const idToken = await user.getIdToken();

        Cookies.set('userToken', idToken, { expires: 1, secure: true, sameSite: 'Strict' });

        await saveUserToFirestore();
        await checkUserNickname();
      }
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

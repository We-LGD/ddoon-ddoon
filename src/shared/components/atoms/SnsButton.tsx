import { isMobile } from 'react-device-detect';
import { IoChatbubble } from 'react-icons/io5';
import { Images } from '@/shared/assets/images';
import Modal from '@/shared/components/organisms/Modal';

export default function SnsButton({ type }: { type: 'kakao' | 'github' }) {
  return (
    <>
      {type === 'kakao' ? (
        <div
          className={`flex-center ${isMobile ? 'w-full' : 'w-[27.375rem]'} h-[2.75rem] bg-[#FEE500] text-black font-bold rounded-[0.25rem] cursor-pointer`}
          onClick={() => Modal({ icon: 'warning', desc: '준비중인 기능입니다.', buttonTitle: '확인' })}
        >
          <IoChatbubble className="h-5 w-5 mr-1 mb-1" />
          <button>카카오로 시작하기</button>
        </div>
      ) : null}
      {type === 'github' ? (
        <div
          className={`flex-center  ${isMobile ? 'w-full' : 'w-[27.375rem]'} h-[2.75rem] bg-white text-black font-bold rounded-[0.25rem] border border-disabled cursor-pointer`}
          onClick={() => Modal({ icon: 'warning', desc: '준비중인 기능입니다.', buttonTitle: '확인' })}
        >
          <img src={Images.GithubLogo} className="h-5 mr-1 mb-1" />
          <button>깃허브로 시작하기</button>
        </div>
      ) : null}
    </>
  );
}

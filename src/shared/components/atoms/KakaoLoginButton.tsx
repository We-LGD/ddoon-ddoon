import { isMobile } from 'react-device-detect';
import { IoChatbubble } from 'react-icons/io5';
import Modal from '@/shared/components/organisms/Modal';

export default function KakaoLoginButton() {
  return (
    <div
      className={`flex-center ${isMobile ? 'w-full' : 'w-[27.375rem]'} h-[2.75rem] bg-[#FEE500] text-black font-bold rounded-[0.25rem] cursor-pointer`}
      onClick={() => Modal({ icon: 'warning', desc: '준비중인 기능입니다.', buttonTitle: '확인' })}
    >
      <IoChatbubble className="h-5 w-5 mr-1 mb-1" />
      <button>카카오로 시작하기</button>
    </div>
  );
}

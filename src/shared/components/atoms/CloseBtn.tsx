import Swal from 'sweetalert2';
import { SlClose } from 'react-icons/sl';
import { FailProps } from '@/shared/interface/atomsType';

function CloseBtn({ isFail }: FailProps) {
  const showDeleteAlert = () => {
    Swal.fire({
      title: '정말로 삭제하시겠어요?',
      html: '삭제된 챌린지는 복구 할 수 없습니다.',
      showCancelButton: true,
      confirmButtonText: '확인',
      confirmButtonColor: '#748D70',
      cancelButtonText: '취소',
      cancelButtonColor: '#D9D9D9',
      reverseButtons: true,
      customClass: {
        title: 'text-lg',
        popup: 'w-[25.375rem] h-[13.625rem] pt-5 font-default text-sm',
        cancelButton: 'w-[10rem] h-[3.125rem] text-white rounded hover:bg-#999999',
        confirmButton: 'w-[10rem] h-[3.125rem] text-white rounded hover:bg-active',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('삭제');
      }
    });
  };
  return (
    <button
      onClick={showDeleteAlert}
      className={`w-{1rem} h-{1rem} flex justify-center items-center absolute right-2 top-2 ${isFail ? 'hidden' : ''}`}
    >
      <SlClose />
    </button>
  );
}

export default CloseBtn;

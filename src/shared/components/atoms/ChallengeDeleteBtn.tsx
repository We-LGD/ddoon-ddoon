import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useDummyStore from '@/store/useDummyStore';
import { ResultProps } from '@/shared/interface/atomsType';
import Button from '@/shared/components/atoms/Button';

function CloseBtn({ result, index }: ResultProps) {
  const { deleteDummy } = useDummyStore();

  const handleDelete = () => {
    Swal.close();
    if (index) {
      deleteDummy(index);
    }
  };

  const showDeleteModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const MySwal = withReactContent(Swal);

    MySwal.fire({
      title: <h2 className="font-bold text-lg">정말로 삭제하시겠어요?</h2>,
      html: (
        <div className="flex flex-col gap-10 overflow-y-hidden">
          <p className="font-default text-sm">삭제된 챌린지는 복구 할 수 없습니다.</p>
          <section className="flex justify-center items-center gap-3">
            <Button
              cancel={true}
              event={() => {
                Swal.close();
              }}
            >
              취소
            </Button>
            <Button event={handleDelete}>확인</Button>
          </section>
        </div>
      ),
      showConfirmButton: false,
      customClass: {
        popup: 'max-w-[25.375rem] w-full h-[13.625rem]',
      },
    });
  };

  return (
    <button
      onClick={showDeleteModal}
      className={`w-[1.563rem] h-[1.563rem] text-center leading-[1.563em] absolute right-2 top-2 z-10 p-0 rounded-full border-2 hover:border-highlight hover:text-highlight ${result === 'success' || result === 'fail' ? 'hidden' : ''}`}
    >
      x
    </button>
  );
}

export default CloseBtn;

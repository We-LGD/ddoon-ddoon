import Swal from 'sweetalert2';
import useDummyStore from '@/store/useDummyStore';
import DeleteModal from '@/pages/Challenge/DeleteModal';
import { ResultProps } from '@/pages/interface';

function DeleteBtn({ result, index }: ResultProps) {
  const { deleteDummy } = useDummyStore();

  const handleDelete = () => {
    Swal.close();
    if (index) {
      deleteDummy(index);
    }
  };

  const showDeleteModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    DeleteModal({ handleDelete });
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

export default DeleteBtn;

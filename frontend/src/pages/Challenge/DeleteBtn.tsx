import Swal from 'sweetalert2';
import axiosInstance from '@/shared/utils/axios';
import useChallengeStore from '@/shared/store/useChallengeStore';
import DeleteModal from '@/pages/Challenge/DeleteModal';
import { ResultProps } from '@/pages/interface';

export default function DeleteBtn({ idx, result }: ResultProps) {
  const { getChallengeList } = useChallengeStore();

  const handleDelete = () => {
    const deleteChallenge = async () => {
      try {
        await axiosInstance.delete(`/challenge/${idx}`);
        await getChallengeList();
      } catch (error) {
        console.error('Error fetching challenges:', error);
      }
    };

    deleteChallenge();
    Swal.close();
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

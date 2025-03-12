import axios from 'axios';
import Swal from 'sweetalert2';
import useFirebaseToken from '@/shared/hook/useFirebaseToken';
import useChallengeStore from '@/shared/store/useChallengeStore';
import DeleteModal from '@/pages/Challenge/DeleteModal';
import { ResultProps } from '@/pages/interface';

export default function DeleteBtn({ idx, result }: ResultProps) {
  const userToken = useFirebaseToken();
  const { getChallengeList } = useChallengeStore();

  const handleDelete = () => {
    const deleteChallenge = async () => {
      try {
        await axios.delete(`http://localhost:3000/challenge/${idx}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
        });
        if (userToken) await getChallengeList(userToken);
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

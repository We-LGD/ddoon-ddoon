import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Title from '@/shared/components/atoms/Title';
import Button from '@/shared/components/atoms/Button';

function ChallengeDeleteModal({ handleDelete }: { handleDelete: () => void }) {
  const MySwal = withReactContent(Swal);

  MySwal.fire({
    title: <Title>정말로 삭제하시겠어요?</Title>,
    html: (
      <div className="flex flex-col gap-10 overflow-y-hidden">
        <p className="font-default text-sm">삭제된 챌린지는 복구 할 수 없습니다.</p>
        <section className="flex justify-center items-center gap-3">
          <Button
            theme="modal"
            cancel={true}
            event={() => {
              Swal.close();
            }}
          >
            취소
          </Button>
          <Button theme="modal" event={handleDelete}>
            확인
          </Button>
        </section>
      </div>
    ),
    showConfirmButton: false,
    customClass: {
      popup: 'max-w-[25.375rem] w-full',
    },
  });
}

export default ChallengeDeleteModal;

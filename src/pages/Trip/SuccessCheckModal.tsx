import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Button from '@/shared/components/atoms/Button';
import RetryCheckModal from '@/pages/Trip/RetryCheckModal';

function SuccessCheckModal({ event }: { event: () => void }) {
  const ReactSwal = withReactContent(Swal);

  ReactSwal.fire({
    icon: 'question',
    html: (
      <>
        <div className="font-default text-sm">
          <p className="mb-4">오늘의 챌린지를 완료 하셨나요?</p>
          <section className="flex-center gap-3">
            <Button
              theme="modal"
              cancel={true}
              event={() => {
                Swal.close();
              }}
            >
              취소
            </Button>
            <Button
              theme="modal"
              event={() => {
                Swal.close();
                RetryCheckModal({ event });
              }}
            >
              완료
            </Button>
          </section>
        </div>
      </>
    ),
    showConfirmButton: false,
    customClass: {
      popup: 'max-w-[25.375rem]',
    },
  });
}

export default SuccessCheckModal;

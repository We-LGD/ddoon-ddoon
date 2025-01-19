import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Button from '@/shared/components/atoms/Button';

function RetryCheckModal({ event }: { event: () => void }) {
  const ReactSwal = withReactContent(Swal);

  ReactSwal.fire({
    icon: 'question',
    html: (
      <>
        <div className="font-default text-sm">
          <p className="mb-4">진짜 완료하셨죠?</p>
          <section className="flex-center gap-3">
            <Button
              theme="modal"
              cancel={true}
              event={() => {
                Swal.close();
              }}
            >
              사실...
            </Button>
            <Button
              theme="modal"
              event={() => {
                Swal.close();
                event();
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

export default RetryCheckModal;

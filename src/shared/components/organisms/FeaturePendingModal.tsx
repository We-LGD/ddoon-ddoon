import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Button from '@/shared/components/atoms/Button';

const FeaturePendingModal = () => {
  const ReactSwal = withReactContent(Swal);

  ReactSwal.fire({
    icon: 'warning',
    html: (
      <>
        <div className="font-default text-sm">
          <p className="mb-4">준비중인 기능입니다.</p>
          <Button
            theme="modal"
            event={() => {
              Swal.close();
              localStorage.setItem('tutorialModal', 'false');
            }}
          >
            보상받기
          </Button>
        </div>
      </>
    ),
    showConfirmButton: false,
    customClass: {
      popup: 'max-w-[25.375rem]',
    },
  });
};

export default FeaturePendingModal;

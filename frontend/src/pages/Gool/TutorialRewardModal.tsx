import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Title from '@/shared/components/atoms/Title';
import Button from '@/shared/components/atoms/Button';

export default function TutorialRewardModal() {
  const ReactSwal = withReactContent(Swal);

  ReactSwal.fire({
    html: (
      <>
        <Title>튜토리얼 성공!</Title>
        <div className="font-default text-sm">
          <p className="mb-4">성공 보상으로 굴 하나를 열어줄께</p>
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
}

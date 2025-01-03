import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Button from '@/shared/components/atoms/Button';

const TutorialRewardModal = () => {
  const ReactSwal = withReactContent(Swal);

  ReactSwal.fire({
    title: <h2 className="font-bold text-lg">튜토리얼 성공!</h2>,
    html: (
      <div className="font-default text-sm">
        <p>성공 보상으로 굴 하나를 열어줄께</p>
        <div className="flex justify-center mt-4">
          <Button
            event={() => {
              Swal.close();
              localStorage.setItem('tutorialModal', 'false');
            }}
          >
            보상받기
          </Button>
        </div>
      </div>
    ),
    showConfirmButton: false,
    customClass: {
      popup: 'w-[25.375rem] h-[13.625rem] pt-5',
    },
  });
};

export default TutorialRewardModal;

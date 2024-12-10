import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Swal from 'sweetalert2';
import Button from '@/shared/components/atoms/Button';

function Gool() {
  const { state } = useLocation();

  const openTutorialRewardModal = () => {
    Swal.fire({
      title: '튜토리얼 성공!',
      html: `
        <div>
          <p>성공 보상으로 굴 하나를 열어줄께</p>
          <div class="flex justify-center mt-4">
            <div id="customConfirmButton"></div>
          </div>
        </div>
      `,
      showConfirmButton: false,
      showCancelButton: false,
      customClass: {
        popup: 'w-[25.375rem] h-[13.625rem] pt-5 font-default text-sm',
      },
      didOpen: () => {
        const confirmButtonContainer = document.getElementById('customConfirmButton');

        if (confirmButtonContainer) {
          const root = createRoot(confirmButtonContainer);
          root.render(
            <Button
              event={() => {
                Swal.close();
              }}
            >
              보상받기
            </Button>,
          );
        }
      },
    });
  };

  useEffect(() => {
    if (state?.tutorialCompleted) {
      openTutorialRewardModal();
    }
  }, [state]);

  return <div>Gool</div>;
}

export default Gool;

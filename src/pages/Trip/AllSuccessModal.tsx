import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Title from '@/shared/components/atoms/Title';
import Button from '@/shared/components/atoms/Button';

export default async function AllSuccessModal() {
  const ReactSwal = withReactContent(Swal);

  await ReactSwal.fire({
    html: (
      <>
        <Title>챌린지 성공</Title>
        <div className="font-default text-sm">
          <p className="mb-4">개미굴이 오픈됩니다!</p>
          <Button
            theme="modal"
            event={() => {
              Swal.close();
            }}
          >
            확인
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

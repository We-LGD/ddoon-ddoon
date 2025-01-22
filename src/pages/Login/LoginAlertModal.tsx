import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Button from '@/shared/components/atoms/Button';
import Title from '@/shared/components/atoms/Title';

export default function LoginAlertModal() {
  const ReactSwal = withReactContent(Swal);

  ReactSwal.fire({
    title: <Title>로그인이 필요합니다.</Title>,
    icon: 'error',
    html: (
      <Button
        theme="modal"
        event={() => {
          Swal.close();
        }}
      >
        확인
      </Button>
    ),
    showConfirmButton: false,
  });
}

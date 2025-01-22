import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Button from '@/shared/components/atoms/Button';
import Title from '@/shared/components/atoms/Title';

export default function LimitModal() {
  const ReactSwal = withReactContent(Swal);

  ReactSwal.fire({
    title: <Title>챌린지는 10개까지만 가능합니다.</Title>,
    icon: 'info',
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

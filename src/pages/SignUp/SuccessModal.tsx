import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Button from '@/shared/components/atoms/Button';
import Title from '@/shared/components/atoms/Title';

export default function SuccessModal() {
  const ReactSwal = withReactContent(Swal);

  ReactSwal.fire({
    title: (
      <Title>
        회원가입을 완료했습니다.
        <br />
        로그인을 해주세요!
      </Title>
    ),
    icon: 'success',
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

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Title from '@/shared/components/atoms/Title';
import Button from '@/shared/components/atoms/Button';
import { ModalProps } from '@/shared/interface/organisms';

export default async function Modal({ icon, title, desc, buttonTitle }: ModalProps) {
  const ReactSwal = withReactContent(Swal);

  await ReactSwal.fire({
    icon,
    html: (
      <div className="font-default text-sm">
        {icon ? <h1 className="text-[1.125rem] font-bold">{title}</h1> : <Title>{title}</Title>}
        <p className="mb-4 pt-4">{desc}</p>
        <Button
          theme="modal"
          event={() => {
            Swal.close();
          }}
        >
          {buttonTitle}
        </Button>
      </div>
    ),
    customClass: {
      popup: 'max-w-[22rem] w-full',
    },
    showConfirmButton: false,
  });
}

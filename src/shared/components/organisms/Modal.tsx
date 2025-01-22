import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Title from '@/shared/components/atoms/Title';
import Button from '@/shared/components/atoms/Button';

export default async function Modal({
  icon,
  title,
  desc,
  buttonTitle,
}: {
  icon?: 'error' | 'info' | 'question' | 'success' | 'warning';
  title?: string;
  desc?: string;
  buttonTitle: string;
}) {
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
      popup: 'max-w-[25.375rem] w-full',
    },
    showConfirmButton: false,
  });
}

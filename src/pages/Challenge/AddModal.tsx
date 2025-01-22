import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import AddForm from '@/pages/Challenge/AddForm';

export default function AddModal({
  outsideClick,
  allowEscapKey,
}: {
  outsideClick: () => boolean;
  allowEscapKey: () => boolean;
}) {
  const ReactSwal = withReactContent(Swal);
  ReactSwal.fire({
    title: '',
    html: <AddForm />,
    allowOutsideClick: outsideClick,
    allowEscapeKey: allowEscapKey,
    showConfirmButton: false,
    customClass: {
      popup: 'w-full max-w-[31.125rem] h-auto px-2 font-default text-sm flex justify-center',
    },
  });
}

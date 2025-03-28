import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Images } from '@/shared/assets/images';
import Title from '@/shared/components/atoms/Title';
import { SuccessModalProps } from '@/shared/interface/templatesType';

export default function SuccessModal({ title, imageSrc, onClose }: SuccessModalProps) {
  const ReactSwal = withReactContent(Swal);

  ReactSwal.fire({
    html: (
      <div className="relative bg-white text-center">
        <Title>{title}</Title>
        <div className="w-full h-full bg-slate-600">
          <img src={imageSrc} alt="Success" className="w-full h-full" />
          <img src={Images.성공도장} alt="Success" className="absolute bottom-6 right-6 bg-no-repeat w-[25%]" />
          <p
            className="absolute bottom-10 left-10 font-display text-4xl font-bold transform rotate-12"
            style={{ textShadow: '1px 1px 0px #FFFFFF' }}
          >
            갓생시 뚠뚠로 30Day
          </p>
        </div>
      </div>
    ),
    showConfirmButton: false,
    showCloseButton: true,
    customClass: {
      popup: 'rounded-lg w-100',
    },
    willClose: onClose,
    didOpen: () => {
      const closeButton = document.querySelector('.swal2-close') as HTMLElement;
      if (closeButton) {
        closeButton.onmouseenter = () => {
          closeButton.style.color = '#748D70';
        };
      }
    },
  });
}

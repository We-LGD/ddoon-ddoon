import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Button from '@/shared/components/atoms/Button';

export default async function GuestLogoutModal(): Promise<boolean> {
  const ReactSwal = withReactContent(Swal);

  return new Promise((resolve) => {
    ReactSwal.fire({
      icon: 'warning',
      html: (
        <>
          <div className="font-default text-sm">
            <p className="mb-4">로그아웃 시 게스트의 데이터가 삭제됩니다😭</p>
            <section className="flex-center gap-3">
              <Button
                theme="modal"
                cancel={true}
                event={() => {
                  ReactSwal.close();
                  resolve(false);
                }}
              >
                취소
              </Button>
              <Button
                theme="modal"
                event={() => {
                  ReactSwal.close();
                  resolve(true);
                }}
              >
                완료
              </Button>
            </section>
          </div>
        </>
      ),
      showConfirmButton: false,
      customClass: {
        popup: 'max-w-[22rem]',
      },
    });
  });
}

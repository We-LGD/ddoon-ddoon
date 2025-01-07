import { Link, useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Images } from '@/shared/assets/images';
import useInputStore from '@/store/useInputStore';
import Input from '@/shared/components/atoms/Input';
import Button from '@/shared/components/atoms/Button';
import SnsButton from '@/shared/components/atoms/SnsButton';

function Login() {
  const ReactSwal = withReactContent(Swal);
  const navigate = useNavigate();
  const { inputs } = useInputStore();
  const { id, password } = inputs;

  const handleLoginBtnClick = () => {
    // TODO: 백엔드 연결 후 제거
    console.log(`로그인 버튼 클릭 : id: ${id} / password: ${password}`);

    // TODO: 튜토리얼 완료 여부 저장
    // - 튜토리얼 미 완료 시 navigate('/tutorial')
    // - 튜토리얼 완료 시 navigate('/challenge')

    if (id && password) {
      navigate('/challenge');
    } else {
      ReactSwal.fire({
        icon: 'info',
        html: (
          <div className="font-default text-sm">
            <p className="mb-4">
              아이디와 비밀번호를
              <br />
              모두 입력해주세요.
            </p>
            <Button
              theme="modal"
              event={() => {
                Swal.close();
              }}
            >
              확인
            </Button>
          </div>
        ),
        showConfirmButton: false,
        customClass: {
          popup: 'max-w-[25.375rem] w-full',
        },
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <img src={Images.뚠뚠로고} alt="뚠뚠로고" className=" w-48 mb-[1rem]" />

      <section className={`flex flex-col items-center justify-center gap-3 mb-8 ${isMobile ? 'w-full' : null}`}>
        <Input theme="auth" placeholder="아이디 입력" name="id" maxLength={20} />
        <Input theme="auth" type="password" placeholder="비밀번호 입력" name="password" maxLength={64} />
        <Button theme="auth" event={handleLoginBtnClick}>
          로그인
        </Button>

        <div>
          <Link to="/signup" className="text-[0.75rem] text-disabledHover">
            회원가입
          </Link>
          <span className="text-[0.75rem] text-disabledHover"> | </span>
          <Link to="/nickname-setup" className="text-[0.75rem] text-disabledHover">
            게스트로 입장하기 {'>'}
          </Link>
        </div>
      </section>

      <section className={`flex flex-col gap-3 ${isMobile ? 'w-full' : null}`}>
        <div className={`flex items-center justify-between ${isMobile ? 'w-full' : 'w-[27.375rem]'}`}>
          <hr className="border-t-2 flex-grow border-gray-300" />
          <span className="whitespace-nowrap mx-2 text-[0.75rem] text-center text-disabledHover">SNS로 시작하기</span>
          <hr className="border-t-2 flex-grow border-gray-300" />
        </div>
        <SnsButton type="kakao" />
        <SnsButton type="github" />
      </section>
    </div>
  );
}

export default Login;

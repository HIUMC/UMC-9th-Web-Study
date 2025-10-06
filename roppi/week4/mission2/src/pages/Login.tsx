import { useNavigate } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import GoogleLogin from '../components/GoogleLogin';


const Login = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-[70px]">
      <div className="relative w-[230px] text-white text-bold flex justify-center p-[5px]">
        <div 
        className="absolute left-[10px] bottom-[6px] cursor-pointer"
        onClick={handleBack}
        >{'<'}</div>
        <div className="flex items-center justify-center">로그인</div>
      </div>
      <div className="mt-[25px] w-[230px] flex flex-col gap-[10px]">

        <GoogleLogin />
        
        <div className="flex items-center text-white gap-[15px]">
          <div className="flex-1 h-px bg-white"></div>
          <span className="px-4 text-center text-[10px]">OR</span>
          <div className="flex-1 h-px bg-white"></div>
        </div>

        <LoginInput/>

      </div>
    </div>
  )
};
export default Login;
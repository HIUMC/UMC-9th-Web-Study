import LoginInput from '../components/LoginInput';
import GoogleLogin from '../components/GoogleLogin';
import TitleBar from '../components/TitleBar';


const Login = () => {



  return (
    <div className="w-[230px] mt-[70px]">
      <TitleBar>로그인</TitleBar>
      <div className="mt-[25px] flex flex-col gap-[10px]">

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
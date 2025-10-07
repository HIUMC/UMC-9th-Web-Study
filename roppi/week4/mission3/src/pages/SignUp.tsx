import { useState } from "react";
import EmailInput from "../components/EmailInput";
import GoogleLogin from "../components/GoogleLogin";
import TitleBar from "../components/TitleBar";
import PasswordInput from "../components/PasswordInput";
import ProfileInput from "../components/Profile";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] =useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('');
    const [step, setStep] = useState(1); 

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setEmail(value);

    // 이메일 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError('유효하지 않은 이메일 형식입니다.');
    } else {
      setEmailError('');
    }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setPassword(value);

    // 비밀번호 길이 검사
    if (value && value.length < 6) {
      setPasswordError('비밀번호는 최소 6자 이상이어야 합니다')
    }else {
      setPasswordError('');
    }
  };

  const handlePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPasswordCheck(value);
  };

  const handleNext = () => setStep((prev) => prev + 1);
  // const handlePrev = () => setStep((prev) => prev - 1);




  return (

    <div className="mt-[70px] ">
    <TitleBar>회원가입</TitleBar>
    {step === 1 &&
      <div className="mt-[25px] flex flex-col gap-[10px]">
      <GoogleLogin />    
           
        <div className="flex items-center text-white gap-[15px]">
          <div className="flex-1 h-px bg-white"></div>
          <span className="px-4 text-center text-[10px]">OR</span>
          <div className="flex-1 h-px bg-white"></div>
        </div>

      <div className="w-full flex flex-col gap-[15px]">
          <EmailInput value={email} onChange={handleEmailChange} error={emailError} />
          <button 
          disabled={!(email && !emailError)}
          onClick={handleNext}
          className={`w-full py-[7px] text-[#8e8e8e] bg-[#1d1d1d] rounded-sm text-[11px] ${ (!email || emailError ) ? 'opacity-50 cursor-not-allowed' : 'bg-[#e52582] text-white hover:opacity-80 cursor-pointer'}`}
          >다음</button>
        </div>

      </div>
    }
    { step === 2 &&
      <div className="w-full mt-[10px] flex flex-col gap-[10px]">
        <span className="text-white text-[13px] text-bold">📨 {email}</span>
        <PasswordInput value={password} onChange={handlePasswordChange} placeholder="비밀번호를 입력해 주세요!" signup={true}/>
        {passwordError && <p className="text-[#e52582] text-[12px]">{passwordError}</p>}
        <PasswordInput value={passwordCheck} onChange={handlePasswordCheck} placeholder="비밀번호를 다시 한 번 입력해 주세요!" signup={true}/>
        {passwordCheck && !(password === passwordCheck) && <p className="text-[#e52582] text-[12px]">비밀번호가 일치하지 않습니다</p> } 
          <button 
          disabled={!(password === passwordCheck)}
          onClick={handleNext}
          className={`w-full py-[7px] text-[#8e8e8e] bg-[#1d1d1d] rounded-sm text-[11px] ${ (!(password && password === passwordCheck) ) ? 'opacity-50 cursor-not-allowed' : 'bg-[#e52582] text-white hover:opacity-80 cursor-pointer'}`}
          >다음</button>
      </div>
    }
    { step === 3 &&
    <ProfileInput />
    }
      
    </div>

  )
};

export default SignUp;
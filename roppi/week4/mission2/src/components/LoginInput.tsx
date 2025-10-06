import { useState } from "react";

const LoginInput = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  

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

  }

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


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailError && email) {
      console.log('로그인 시도'); // 실제 로그인 처리
    }
  };

  return (
       <div className="w-full flex flex-col gap-[15px]">
          <input 
          type="email"
          placeholder="이메일을 입력해 주세요!"
          value={email}
          onChange={handleEmailChange}
          className="w-full py-[7px] pl-[10px] border border-[#8e8e8e] bg-transparent rounded-sm  text-[#cfcfcf] text-[13px] placeholder:text-[#8e8e8e] focus:outline-none"
          />
          {emailError && <p className="text-[#e52582] text-sm">{emailError}</p>}
          <input 
          type="password"
          placeholder="비밀번호를 입력해 주세요!"
          value={password}
          onChange={handlePasswordChange}
          className="w-full py-[7px] pl-[10px] border border-[#8e8e8e] bg-transparent rounded-sm  text-[#cfcfcf] text-[13px] placeholder:text-[#8e8e8e] focus:outline-none"
          />
          {passwordError && <p className="text-[#e52582] text-sm">{passwordError}</p>}
          <button 
          disabled={!(email && password && !emailError && !passwordError)}
          className={`w-full py-[7px] text-[#8e8e8e] bg-[#1d1d1d] rounded-sm text-[11px] ${ (!email || !password || emailError || passwordError) ? 'opacity-50 cursor-not-allowed' : 'bg-[#e52582] text-white hover:opacity-80 cursor-pointer'}`}
          onClick={handleSubmit}>
          로그인
          </button>
        </div>
  )
};
export default LoginInput;
import { Eye, EyeOff } from "lucide-react"; // 👈 아이콘 라이브러리 (lucide-react 사용)
import React, { useState } from "react";


interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  showToggle?: boolean; // 로그인/회원가입 구분용
}


const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
   ({ error, placeholder, showToggle = false, ...rest }, ref) => {
    const [show, setShow] = useState(false);


  return(
    <div className="relative w-full flex flex-col">
    <div className="relative">
      <input 
        type={show ? "text" : "password"}
        placeholder={placeholder}
        ref={ref}
        {...rest}
        className="w-full py-[7px] pl-[10px] border border-[#8e8e8e] bg-transparent rounded-sm  text-[#cfcfcf] text-[13px] placeholder:text-[#8e8e8e] placeholder:text-[12px] focus:outline-none"
        />
      
    {
        showToggle && (
      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="absolute right-[10px] top-1/2 -translate-y-1/2 text-[#8e8e8e] hover:text-white"
        aria-label="비밀번호 보기 토글"
      >
      {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
        )}
    </div>
      {error && <p className="text-[#e52582] text-[12px] mt-[8px]">{error}</p>}
    </div>
    );
  }
);

export default PasswordInput;
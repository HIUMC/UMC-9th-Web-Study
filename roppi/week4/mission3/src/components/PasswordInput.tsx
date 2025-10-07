import { Eye, EyeOff } from "lucide-react"; // 👈 아이콘 라이브러리 (lucide-react 사용)
import { useState } from "react";


interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  signup?: boolean;
}


const PasswordInput = ({value, onChange, placeholder, signup}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return(
    <div className="relative w-full flex flex-col">
    <input 
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full py-[7px] pl-[10px] border border-[#8e8e8e] bg-transparent rounded-sm  text-[#cfcfcf] text-[13px] placeholder:text-[#8e8e8e] placeholder:text-[12px] focus:outline-none"
        />
      
      {
        signup && (
      <button
        type="button"
        onClick={toggleShowPassword}
        className="absolute right-[10px] top-1/2 -translate-y-1/2 text-[#8e8e8e] hover:text-white"
        aria-label="비밀번호 보기 토글"
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
        ) 
      }
    
    </div>
  )
};

export default PasswordInput;
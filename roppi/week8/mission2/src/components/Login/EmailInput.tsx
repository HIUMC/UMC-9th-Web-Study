import React from "react";
interface EmailInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}


const EmailInput = React.forwardRef<HTMLInputElement, EmailInputProps>(
  ({ error, ...rest }, ref) => {
  return(
    <div className="">
    <input 
          type="email"
          placeholder="이메일을 입력해 주세요!"
          ref={ref}
          {...rest}
          className="w-full py-[7px] pl-[10px] border border-[#8e8e8e] bg-transparent rounded-sm  text-[#cfcfcf] text-[13px] placeholder:text-[#8e8e8e] focus:outline-none"
          />
          {error && <p className="text-[#e52582] text-[12px] mt-[8px]">{error}</p>}
    </div>
  )
}
);
export default EmailInput
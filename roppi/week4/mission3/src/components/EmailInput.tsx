interface EmailInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const EmailInput = ({ value, onChange, error }: EmailInputProps) => {
  return(
    <>
    <input 
          type="email"
          placeholder="이메일을 입력해 주세요!"
          value={value}
          onChange={onChange}
          className="w-full py-[7px] pl-[10px] border border-[#8e8e8e] bg-transparent rounded-sm  text-[#cfcfcf] text-[13px] placeholder:text-[#8e8e8e] focus:outline-none"
          />
          {error && <p className="text-[#e52582] text-sm">{error}</p>}
    </>
  )
};
export default EmailInput
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { type FormFields } from "../types/schema";

// FormInput 컴포넌트가 받을 props 타입을 정의합니다.
interface FormInputProps {
  name: keyof FormFields; // "email", "password" 등 필드 이름
  type: string;
  placeholder: string;
  register: UseFormRegister<FormFields>;
  errors: FieldErrors<FormFields>;
}

const FormInput = ({
  name,
  type,
  placeholder,
  register,
  errors,
}: FormInputProps) => {
  const hasError = errors[name]; // 현재 필드에 에러가 있는지 확인

  return (
    <div>
      <input
        {...register(name)} // react-hook-form의 register를 적용
        type={type}
        placeholder={placeholder}
        className={`text-gray-100 border border-[#ccc] w-full p-[10px] focus:border-[#807bff] rounded-sm ${
          hasError ? "border-red-500 bg-red-200" : "border-gray-300"
        }`}
      />
      {hasError && (
        <div className="text-red-500 text-sm mt-1">{errors[name]?.message}</div>
      )}
    </div>
  );
};

export default FormInput;

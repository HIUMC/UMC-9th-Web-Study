import { useState } from "react";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { FormFields } from "../../types/schema";
import FormInput from "../FormInput";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { CiMail } from "react-icons/ci";

interface PasswordStepProps {
  email: string;
  register: UseFormRegister<FormFields>;
  errors: FieldErrors<FormFields>;
  onNext: () => void;
}

const PasswordStep = ({
  email,
  register,
  errors,
  onNext,
}: PasswordStepProps) => {
  // 👇 1. 상태를 두 개로 분리합니다.
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  // 👇 2. 각 상태를 위한 토글 함수를 만듭니다.
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const togglePasswordCheckVisibility = () => {
    setShowPasswordCheck((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex items-center gap-2">
        <CiMail size={30} className="text-white" />
        <span className="text-white">{email}</span>
      </div>
      {/* 비밀번호 입력 필드 */}
      <div className="relative">
        <FormInput
          name="password"
          // 👇 3. 'password' 상태와 연결합니다.
          type={showPassword ? "text" : "password"}
          placeholder="비밀번호를 입력해주세요!"
          register={register}
          errors={errors}
        />
        <button
          type="button"
          // 👇 4. 'password' 토글 함수와 연결합니다.
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-3 text-white"
        >
          {/* 👇 5. 'password' 상태에 따라 아이콘을 보여줍니다. */}
          {showPassword ? (
            <AiOutlineEyeInvisible size={20} />
          ) : (
            <AiOutlineEye size={20} />
          )}
        </button>
      </div>

      {/* 비밀번호 확인 필드 */}
      <div className="relative">
        <FormInput
          name="passwordCheck"
          // 👇 3. 'passwordCheck' 상태와 연결합니다.
          type={showPasswordCheck ? "text" : "password"}
          placeholder="비밀번호를 다시 입력해주세요!"
          register={register}
          errors={errors}
        />
        <button
          type="button"
          // 👇 4. 'passwordCheck' 토글 함수와 연결합니다.
          onClick={togglePasswordCheckVisibility}
          className="absolute right-3 top-3 text-white"
        >
          {/* 👇 5. 'passwordCheck' 상태에 따라 아이콘을 보여줍니다. */}
          {showPasswordCheck ? (
            <AiOutlineEyeInvisible size={20} />
          ) : (
            <AiOutlineEye size={20} />
          )}
        </button>
      </div>

      <button
        type="button"
        onClick={onNext}
        className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700"
      >
        다음
      </button>
    </div>
  );
};

export default PasswordStep;

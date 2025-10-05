import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { FormFields } from "../../types/schema";
import FormInput from "../FormInput";
import { FaRegCircleUser } from "react-icons/fa6";

interface NameStepProps {
  register: UseFormRegister<FormFields>;
  errors: FieldErrors<FormFields>;
  isSubmitting: boolean; // 부모로부터 isSubmitting 상태를 받습니다.
}

const NameStep = ({ register, errors, isSubmitting }: NameStepProps) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="text-center mb-4">
        <FaRegCircleUser size={120} className="text-white mx-auto" />
      </div>
      <FormInput
        name="name"
        type="text"
        placeholder="이름을 입력해주세요!"
        register={register}
        errors={errors}
      />
      <button
        type="submit" // 폼 최종 제출을 위한 type="submit"
        disabled={isSubmitting} // 제출 중일 때 비활성화
        className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 disabled:bg-gray-500"
      >
        {isSubmitting ? "가입 처리 중..." : "회원가입"}
      </button>
    </div>
  );
};

export default NameStep;
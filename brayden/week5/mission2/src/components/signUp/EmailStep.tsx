import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { FormFields } from "../../types/schema";
import GoogleLoginButton from "../GoogleLoginButton";
import OrSeparator from "../OrSeparator";
import FormInput from "../FormInput"; 

interface EmailStepProps {
  register: UseFormRegister<FormFields>;
  errors: FieldErrors<FormFields>;
  onNext: () => void;
}

const EmailStep = ({ register, errors, onNext }: EmailStepProps) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <GoogleLoginButton />
      <OrSeparator />

      <FormInput
        name="email"
        type="email"
        placeholder="이메일을 입력해주세요!"
        register={register}
        errors={errors}
      />

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

export default EmailStep;

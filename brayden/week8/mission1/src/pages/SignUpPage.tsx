import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { postSignup } from "../apis/auth";

import { type FormFields, schema } from "../types/schema";
import Header from "../components/loginPage/Header";
import { useState } from "react";
import EmailStep from "../components/signUpPage/EmailStep";
import PasswordStep from "../components/signUpPage/PasswordStep";
import NameStep from "../components/signUpPage/NameStep";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });
  const emailValue = watch("email");
  const handleNext = async () => {
    let fieldsToValidate: (keyof FormFields)[] = [];
    if (step === 1) fieldsToValidate = ["email"];
    if (step === 2) fieldsToValidate = ["password", "passwordCheck"];

    const isValid = await trigger(fieldsToValidate);
    if (isValid) setStep((prev) => prev + 1);
  };

  const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordCheck, ...rest } = data;

    try {
      await postSignup(rest);
      alert("회원가입이 성공적으로 완료되었습니다!");
      navigate("/");
    } catch (error) {
      alert((error as Error).message || "회원가입 중 오류가 발생했습니다.");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 bg-black">
      <Header title="회원가입" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-[300px]"
      >
        {step === 1 && (
          <EmailStep register={register} errors={errors} onNext={handleNext} />
        )}
        {step === 2 && (
          <PasswordStep
            email={emailValue}
            register={register}
            errors={errors}
            onNext={handleNext}
          />
        )}
        {step === 3 && (
          <NameStep
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
          />
        )}
      </form>
    </div>
  );
};

export default SignUpPage;

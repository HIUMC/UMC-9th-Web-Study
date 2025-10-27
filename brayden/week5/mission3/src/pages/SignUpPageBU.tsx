import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { postSignup } from "../apis/auth";

import { type FormFields, schema } from "../types/schema";
import FormInput from "../components/FormInput";
import GoogleLoginButton from "../components/GoogleLoginButton";
import Header from "../components/Header";
import OrSeparator from "../components/OrSeparator";
// import { useState } from "react";

const SignUpPage = () => {
  // const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    // trigger,
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

//   const hadleNext = async () => {
//     let fieldsToValidate: (keyof FormFields)[] = [];
//     if (step === 1) fieldsToValidate = ["email"];
//     if (step === 2) fieldsToValidate = ["password", "passwordCheck"];

//     const isValid = await trigger(fieldsToValidate);
//     if (isValid) setStep((prev) => prev + 1);
//   };

  const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordCheck, ...rest } = data;

    const response = await postSignup(rest);
    console.log(response);
  };
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 bg-black">
      <Header title="회원가입" />
      <div className="flex flex-col gap-3 w-[300px]">
        <GoogleLoginButton />
        <OrSeparator />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-[300px]"
      >
        <FormInput
          name="email"
          type="email"
          placeholder="이메일을 입력해주세요!"
          register={register}
          errors={errors}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요!"
          register={register}
          errors={errors}
        />
        <FormInput
          name="passwordCheck"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요!"
          register={register}
          errors={errors}
        />
        <FormInput
          name="name"
          type="text"
          placeholder="이름을 입력해주세요!"
          register={register}
          errors={errors}
        />
        <button type="submit" disabled={isSubmitting} className="...">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;

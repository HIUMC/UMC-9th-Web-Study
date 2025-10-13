import react from "react";
import useForm from "../hooks/useForm";
import {
  validateSignin,
  type UserSigninInformation,
} from "../utils/validate.ts";

export default function LoginPage() {
  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  const handleSubmit = () => {
    console.log(values);
  };

  //오류가 하나라도 있거나, 입력값이 비어있을 경우 버튼이 비활성화됨
  const isDisabled =
    Object.values(errors || {}).length > 0 ||
    Object.values(values).some((value) => value === "");

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <input
          {...getInputProps("email")}
          type="email"
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#887bff] rounded-sm ${
            errors?.email && touched?.email
              ? "border-red-500 bg-red-200"
              : "border-gray-300"
          }`}
          placeholder="이메일"
        />
        {errors?.email && touched?.email && errors.email !== "" && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}
        <input
          {...getInputProps("password")}
          type="password"
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#887bff] rounded-sm ${
            errors?.password && touched?.password
              ? "border-red-500 bg-red-200"
              : "border-gray-300"
          }`}
          placeholder="비밀번호"
        />
        {errors?.password && touched?.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className={`bg-[#887bff] text-white w-[300px] p-[10px] rounded-sm cursor-pointer hover:bg-[#776eff]
            disabled:bg-[#ccc] disabled:cursor-not-allowed`}
        >
          로그인
        </button>
      </div>
    </div>
  );
}

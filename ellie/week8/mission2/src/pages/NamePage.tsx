import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import z, { email } from "zod";
import BackButton from "../components/BackButton";
import SignupInputForm from "../components/SignupInputForm";
import { postSignup } from "../apis/auth";

const schema = z.object({
  name: z.string().min(1, { message: "이름을 입력해주세요" }),
});

type FormFields = z.infer<typeof schema>;

export default function NamePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password } = location.state;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const body = {
        email,
        password,
        name: data.name,
      };

      const response = await postSignup(body);

      if (response.data?.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
      }

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("오류발생");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col justify-center">
        <div className="relative w-[300px] mb-5">
          <BackButton />
          <h1 className="text-center font-bold text-3xl">회원가입</h1>
        </div>
      </div>
      <div>
        <img
          src="https://www.gravatar.com/avatar/?d=mp&s=200"
          alt="기본 프로필"
          className="w-40 h-40 rounded-full"
        />
      </div>
      <div className="flex flex-col gap-3">
        <SignupInputForm
          name="name"
          type="name"
          placeholder="이름을 입력하세요"
          register={register}
          error={errors.name?.message}
        />
        <button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium 
            hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
        >
          회원가입 완료
        </button>
      </div>
    </div>
  );
}

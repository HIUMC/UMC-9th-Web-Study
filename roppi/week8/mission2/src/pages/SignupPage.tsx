import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import GoogleLogin from "../components/GoogleLogin";
import TitleBar from "../components/TitleBar";
import { postSignup } from "../apis/auth";

const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하이어야 합니다." }),
    passwordCheck: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하이어야 합니다." }),
    name: z.string().min(1, { message: "이름을 입력해 주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log("onSubmit 호출됨", data);
    const { passwordCheck, ...rest } = data; // passwordCheck 제외
    try {
      const response = await postSignup(rest);
      console.log("서버 응답:", response);
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  const emailValue = watch("email");
  const passwordValue = watch("password");
  const passwordCheckValue = watch("passwordCheck");

  return (
    <div className="w-full flex justify-center">

    <div className="w-[230px] mt-[70px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TitleBar>회원가입</TitleBar>

        <div className="mt-[25px] flex flex-col gap-[10px]">
          <GoogleLogin />
          <div className="flex items-center text-white gap-[15px]">
            <div className="flex-1 h-px bg-white"></div>
            <span className="px-4 text-center text-[10px]">OR</span>
            <div className="flex-1 h-px bg-white"></div>
          </div>

          <div className="w-full flex flex-col gap-[15px]">
            <input
              {...register("email")}
              className="w-full py-[7px] pl-[10px] border border-[#8e8e8e] bg-transparent rounded-sm text-[#cfcfcf] text-[13px] placeholder:text-[#8e8e8e] focus:outline-none"
              type="email"
              placeholder="이메일"
            />
            {errors.email && (
              <div className="text-[#e52582] text-[12px] mt-[4px]">{errors.email.message}</div>
            )}
            <input
              {...register("name")}
              className="w-full py-[7px] pl-[10px] border border-[#8e8e8e] bg-transparent rounded-sm text-[#cfcfcf] text-[13px] placeholder:text-[#8e8e8e] focus:outline-none"
              type="text"
              placeholder="이름"
            />
            {errors.name && (
              <div className="text-[#e52582] text-[12px] mt-[4px]">{errors.name.message}</div>
            )}
          </div>
        </div>

        <div className="w-full mt-[10px] flex flex-col gap-[10px]">
          <input
            {...register("password")}
            className="w-full py-[7px] pl-[10px] border border-[#8e8e8e] bg-transparent rounded-sm text-[#cfcfcf] text-[13px] placeholder:text-[#8e8e8e] focus:outline-none"
            type="password"
            placeholder="비밀번호"
          />
          {errors.password && (
            <div className="text-[#e52582] text-[12px] mt-[4px]">{errors.password.message}</div>
          )}

          <input
            {...register("passwordCheck")}
            className="w-full py-[7px] pl-[10px] border border-[#8e8e8e] bg-transparent rounded-sm text-[#cfcfcf] text-[13px] placeholder:text-[#8e8e8e] focus:outline-none"
            type="password"
            placeholder="비밀번호 확인"
          />
          {errors.passwordCheck && (
            <div className="text-[#e52582] text-[12px] mt-[4px]">{errors.passwordCheck.message}</div>
          )}

          <button
            type="submit"
            disabled={
              !emailValue ||
              !passwordValue ||
              !passwordCheckValue ||
              !watch("name") ||
              !!errors.email ||
              !!errors.password ||
              !!errors.passwordCheck ||
              !!errors.name
            }
            className={`w-full py-[7px] rounded-sm text-[11px] ${
              !emailValue ||
              !passwordValue ||
              !passwordCheckValue ||
              !watch("name") ||
              !!errors.email ||
              !!errors.password ||
              !!errors.passwordCheck ||
              !!errors.name
                ? "opacity-50 cursor-not-allowed bg-[#1d1d1d] text-[#8e8e8e]"
                : "bg-[#e52582] text-white hover:opacity-80 cursor-pointer"
            }`}
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default SignupPage;

import { useNavigate } from "react-router-dom";
import { validateSignin, type UserSigninInformation } from "../utils/validate";
// import { useForm } from "../hooks/useForm";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다."),
  // password: z
  //   .string()
  //   .min(8, "비밀번호는 8자 이상이어야 합니다.")
  //   .max(20, "비밀번호는 20자 이하여야 합니다."),
  // name: z.string().min(1, "이름을 입력해주세요."),
});

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const nav = useNavigate();

  //useForm 리팩토링
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      //name: "",
      email: "",
      //password: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
    nav("/pw", { state: data.email });
  };

  // const { values, errors, touched, getInputProps } =
  //   useForm<UserSigninInformation>({
  //     initialValue: {
  //       email: "",
  //       password: "",
  //     },
  //     validate: validateSignin,
  //   });
  // const handleSubmit = () => {
  //   nav("/pw", { state: values.email });
  // };
  // const isDisabled =
  //   Object.values(errors?.email || {}).some((errors) => errors.length > 0) ||
  //   Object.values(values.email).some((value) => value === "");
  return (
    <>
      <div className="flex flex-col items-center justify-center h-[80%] gap-4">
        <div className="flex justify-between w-[25%] text-xl font-bold p-4">
          <h1 onClick={() => nav("/")} className="font-bold cursor-pointer">
            &lt;
          </h1>
          <h1>회원가입</h1>
          <h1 className="invisible">&gt;</h1>
        </div>
        <form className="flex flex-col gap-3 w-[25%]">
          <input
            {...register("email")}
            name="email"
            type="email"
            placeholder="이메일을 입력해주세요!"
            className="border rounded-md p-2"
          ></input>
          {errors?.email && (
            <div className="text-red-500 text-sm">{errors.email.message}</div>
          )}

          <button
            className="p-2 bg-blue-900 rounded-md hover:bg-blue-800 transition-all disabled:bg-gray-500"
            onClick={handleSubmit(onSubmit)}
            type="button"
            disabled={isSubmitting}
          >
            다음
          </button>
        </form>
      </div>
    </>
  );
};

export default SignupPage;

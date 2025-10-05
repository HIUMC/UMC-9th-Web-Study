import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { validateSignin, type UserSigninInformation } from "../utils/validate";

const LoginPage = () => {
  const nav = useNavigate();
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

  const isDisabled =
    Object.values(errors || {}).some((errors) => errors.length > 0) ||
    Object.values(values).some((value) => value === "");
  return (
    <>
      <div className="flex flex-col items-center justify-center h-[80%] gap-4">
        <div className="flex justify-between w-[25%] text-xl font-bold p-4">
          <h1 onClick={() => nav("/")} className="font-bold cursor-pointer">
            &lt;
          </h1>
          <h1>로그인</h1>
          <h1 className="invisible">&gt;</h1>
        </div>
        <form className="flex flex-col gap-3 w-[25%]">
          <input
            {...getInputProps("email")}
            name="email"
            type="email"
            placeholder="이메일을 입력해주세요!"
            className="border rounded-md p-2"
          ></input>
          {errors?.email && touched?.email && (
            <div className="text-red-500 text-sm">{errors.email}</div>
          )}
          <input
            {...getInputProps("password")}
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요!"
            className="border rounded-md p-2"
          ></input>
          {errors?.password && touched?.password && (
            <div className="text-red-500 text-sm">{errors.password}</div>
          )}
          <button
            className="p-2 bg-blue-900 rounded-md hover:bg-gray-800 transition-all disabled:bg-gray-500"
            onClick={handleSubmit}
            type="button"
            disabled={isDisabled}
          >
            로그인
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;

import { useNavigate } from "react-router-dom";
import { validateSignin, type UserSigninInformation } from "../utils/validate";
import { useForm } from "../hooks/useForm";

type signupForm = {
  count: number;
  email: string;
};
const SignupPage = () => {
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
    nav("/pw", { state: values.email });
  };
  const isDisabled =
    Object.values(errors?.email || {}).some((errors) => errors.length > 0) ||
    Object.values(values.email).some((value) => value === "");
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
            {...getInputProps("email")}
            name="email"
            type="email"
            placeholder="이메일을 입력해주세요!"
            className="border rounded-md p-2"
          ></input>
          {errors?.email && touched?.email && (
            <div className="text-red-500 text-sm">{errors.email}</div>
          )}

          <button
            className="p-2 bg-blue-900 rounded-md hover:bg-blue-800 transition-all disabled:bg-gray-500"
            onClick={handleSubmit}
            type="button"
            disabled={isDisabled}
          >
            다음
          </button>
        </form>
      </div>
    </>
  );
};

export default SignupPage;

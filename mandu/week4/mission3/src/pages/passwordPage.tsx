import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { validatePw, type UserSingupInformation } from "../utils/validate";
import { useState } from "react";

const SignupPw = () => {
  const nav = useNavigate();
  const location = useLocation();
  const email = location.state;

  const [showPw, setShowPw] = useState(false);
  const [showCon, setShowCon] = useState(false);

  const { values, errors, touched, getInputProps } =
    useForm<UserSingupInformation>({
      initialValue: {
        password: "",
        confirmpw: "",
      },
      validate: validatePw,
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
          <h1
            onClick={() => nav("/signup")}
            className="font-bold cursor-pointer"
          >
            &lt;
          </h1>
          <h1>회원가입</h1>
          <h1 className="invisible">&gt;</h1>
        </div>
        <form className="flex flex-col gap-3 w-[25%]">
          <p>{email}</p>
          <input
            {...getInputProps("password")}
            name="password"
            type={showPw ? "text" : "password"}
            placeholder="비밀번호를 입력해주세요!"
            className="border rounded-md p-2"
          />
          <button
            type="button"
            onClick={() => setShowPw(!showPw)}
            className="absolute top-[51%] right-[38%] flex items-center pr-3 cursor-pointer"
          >
            {showPw ? <LuEyeClosed /> : <LuEye />}
          </button>
          {errors?.password && touched?.password && (
            <div className="text-red-500 text-sm">{errors.password}</div>
          )}
          <input
            {...getInputProps("confirmpw")}
            name="confirmpw"
            type={showCon ? "text" : "password"}
            placeholder="비밀번호를 한 번 더 입력해주세요!"
            className="border rounded-md p-2"
          />
          <button
            type="button"
            onClick={() => setShowCon(!showCon)}
            className="absolute top-[53%] right-[39%]  pt-10 cursor-pointer"
          >
            {showCon ? <LuEyeClosed /> : <LuEye />}
          </button>
          {errors?.confirmpw && touched?.confirmpw && (
            <div className="text-red-500 text-sm">{errors.confirmpw}</div>
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

export default SignupPw;

import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { validateSignin, type UserSigninInformation } from "../utils/validate";

export const LoginPage = () => {
    const navigate = useNavigate();

    const {values, errors, touched, getInputProps} = useForm<UserSigninInformation>({
        initialValue: {
            email: "",
            password: "",
        },
        validate: validateSignin
    });
    const handleSubmit = () => {
        console.log(values);
    };

    const isDisabled =
    Object.values(errors || {}).some(error => error.length > 0) ||
    Object.values(values).some(value => value === "")

    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
           <div className="w-[300px] relative flex justify-center text-white mb-2">
                <button
                onClick={() => navigate(-1)}
                className="absolute left-0 text-2xl cursor-pointer hover:text-gray-300 transition-colors"
                >
                    &lt;
                </button>
                <span className="text-lg font-medium">로그인</span>
                </div>
            <div className="flex flex-col gap-3">
                <input
                {...getInputProps("email")}
                className={`border border-[#ccc] w-[300px] p-[10px] bg-gray-950 text-gray-100 focus: border-[#807bff] rounded-sm
                    ${errors?.email && touched?.email ? "border-blue-300 border-2" : "border-gray-300"}`}
                type={"email"}
                placeholder={"이메일을 입력해주세요!"}
                />
                {errors?.email && touched?.email && (
                    <div className="text-red-500 text-xs">{errors.email}</div>
                    )}
                <input
                {...getInputProps("password")}
                className={`border border-[#ccc] w-[300px] p-[10px] bg-gray-950 text-gray-100 focus: border-[#807bff] rounded-sm
                    ${errors?.password && touched?.password ? "border-blue-300 border-2" : "border-gray-300"}`}
                type={"password"}
                placeholder={"비밀번호를 입력해주세요!"}
                />
                {errors?.password && touched?.password && (
                    <div className="text-red-500 text-xs">{errors.password}</div>
                    )}
                <button
                type="button"
                onClick={handleSubmit}
                disabled={isDisabled}
                className="w-full bg-pink-500 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-600 transition-colors cursor-pointer disabled:bg-gray-300"
                >
                    로그인
                </button>

            </div>
        </div>
    )
}
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod"
import { useLocation, useNavigate } from "react-router-dom";
import { BackButton } from "../components/BackButton";
import { useState } from "react";

const schema = z.object({
    password : z
        .string()
        .min(8, {message: "비밀번호는 8자 이상이어야 합니다."})
        .max(20, {message: "비밀번호는 20자 이하여야 합니다."}),
    passwordCheck : z
        .string()
        .min(8, {message: "비밀번호는 8자 이상이어야 합니다."})
        .max(20, {message: "비밀번호는 20자 이하여야 합니다."}),
    })
    .refine((data) => data.password === data.passwordCheck, { // 반대의 조건임. => 비밀번호가 일치하지 않을때를 명시한 것
        message : "비밀번호가 일치하지 않습니다.",
        path : ["passwordCheck"],
});


type FormFields = z.infer<typeof schema>

const SignupPWPage = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state;
    const [showPw, setShowPw] = useState(false);
    const [showPwC, setShowPwC] = useState(false);

    const {
        register, 
        handleSubmit, 
        formState: {errors, isSubmitting, isValid} // isSubmitting : 버튼 로딩 처리
    } = useForm<FormFields>({ // react-hook-form의 useForm
        defaultValues : {
            password: "",
            passwordCheck: "",
        },
        resolver: zodResolver(schema), // schema 정의에 위반시 에러 메세지
        mode : "onChange" 
        // onBlur: input에서 포커스가 벗어날 때 유효성 검사 실행
        // onChange : input에 키보드로 무언가를 입력할 때마다 즉시 유효성 검사를 실행
    });


    const onSubmit:SubmitHandler<FormFields> = async (data) => {
        
        console.log(data)
        navigate("/name", {state: {email, password:data.password}})
        
        
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4 mt-20">
            <div className="flex flex-col">
                <div className="relative flex w-[300px] items-center justify-center m-3">
                    <div className="absolute left-0">
                        <BackButton />
                    </div>
                    <h1 className="font-bold text-2xl">
                    회원가입
                    </h1>
                </div>
                <p className="text-center">{email}</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                <div className="relative w-[300px]">
                    <input
                        {...register("password")}
                        type={showPw ? "text" : "password"}
                        className={`w-full p-2 pr-10 border rounded-sm border-[#ccc] focus:border-[#807bff] 
                        ${errors?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                        placeholder={"비밀번호"}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPw((prev) => !prev)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 cursor-pointer"
                    >
                        {showPw ? "Hide" : "Show"}
                    </button>
                </div>
                    {errors.password && <div className="text-red-500 text-sm">{errors.password.message}</div>}
                <div className="relative w-[300px]">
                    <input
                        {...register("passwordCheck")}
                        type={showPwC ? "text" : "password"}
                        className={`w-full p-2 pr-10 border rounded-sm border-[#ccc] focus:border-[#807bff] 
                        ${errors?.passwordCheck ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                        placeholder={"비밀번호 확인"}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPwC((prev) => !prev)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 cursor-pointer"
                    >
                        {showPwC ? "Hide" : "Show"}
                    </button>
                </div>
            {errors.passwordCheck && <div className="text-red-500 text-sm">{errors.passwordCheck.message}</div>}

                <button
                    type="submit" 
                    disabled={!isValid || isSubmitting}
                    className="w-full bg-[#4f4e6c] text-white py-3 rounded-md hover:bg-[#403f6a] text-lg font-medium transition-colors cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                다음
                </button>
            </form>
        </div>
    )
}

export default SignupPWPage

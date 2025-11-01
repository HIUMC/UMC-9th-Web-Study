import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod"
import { BackButton } from "../components/BackButton";
import { useNavigate } from "react-router-dom";

// const schema = z.object({
//     email : z.string().email({message: "올바른 이메일 형식이 아닙니다."}),
//     password : z
//         .string()
//         .min(8, {message: "비밀번호는 8자 이상이어야 합니다."})
//         .max(20, {message: "비밀번호는 20자 이하여야 합니다."}),
//     passwordCheck : z
//         .string()
//         .min(8, {message: "비밀번호는 8자 이상이어야 합니다."})
//         .max(20, {message: "비밀번호는 20자 이하여야 합니다."}),
//     name: z.string().min(1, {message: "이름을 입력해주세요."}),
//     })
//     .refine((data) => data.password === data.passwordCheck, { // 반대의 조건임. => 비밀번호가 일치하지 않을때를 명시한 것
//         message : "비밀번호가 일치하지 않습니다.",
//         path : ["passwordCheck"],
// });

const schema = z.object({
    email : z.string().email({message: "올바른 이메일 형식이 아닙니다."}),
});

type FormFields = z.infer<typeof schema>

const SignupPage = () => {

    const navigate = useNavigate();

    const {
        register, 
        handleSubmit, 
        formState: {errors, isSubmitting, isValid} // isSubmitting : 버튼 로딩 처리
    } = useForm<FormFields>({ // react-hook-form의 useForm
        defaultValues : {
            email: "",
        },
        resolver: zodResolver(schema), // schema 정의에 위반시 에러 메세지
        mode : "onChange"
    });


    const onSubmit:SubmitHandler<FormFields> = async (data) => {
        // eslint-disable-next-line
        // const {passwordCheck , ...rest} = data; // 역 구조 분해 할당 => 하나 골라내기
        // const response = await postSignup(rest) 끝나고 보내면 됨.

        console.log(data);

        navigate("/pw",
            {state: data.email} // 상태 값 전달 (마지막에 postSignup 하기 위함)
        ) 
    };

    return (
        <div className="flex flex-col items-center justify-center w-full gap-4 mt-20">
            <div className="flex flex-col">
                <div className="relative flex w-[300px] items-center justify-center m-3">
                    <div className="absolute left-4">
                        <BackButton />
                    </div>
                    <h1 className="font-bold text-2xl">
                        회원가입
                    </h1>
                </div>
                <button className="bg-gray-400 font-semibold text-xl py-5">구글 로그인</button>
                <div className="flex items-center justify-between mt-3">
                    <div className="bg-black h-px w-[120px]" />
                    <div className="text-center text-xl font-semibold">OR</div>
                    <div className="bg-black h-px w-[120px]" />
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <input
                    {...register('email')} // 값 넣는걸 해줌
                    type={"email"}
                    className={`border border-[#ccc] w-[300px] p-2 focus:border-[#807bff] rounded-sm
                    ${errors?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`} 
                    placeholder={"이메일"}
                />
                {errors.email && <div className="text-red-500 text-sm">{errors.email.message}</div>}

                <button 
                    type={"submit"}
                    onClick={handleSubmit(onSubmit)}
                    disabled={!isValid || isSubmitting}
                    className="w-full bg-[#4f4e6c] text-white py-3 rounded-md hover:bg-[#403f6a] text-lg font-medium transition-colors cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                    다음
                </button>
            </div>
        
            </div>
    )
}

export default SignupPage

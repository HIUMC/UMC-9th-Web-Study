import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {z} from "zod";
import { postSignup } from "../apis/auth";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const schema = z.object({
    email: z.string().email({message: "올바른 이메일 형식을 입력해주세요."}),
    password: z.string()
    .min(6, {message: "비밀번호는 6자 이상이어야 합니다.",
    }),
    passwordCheck: z.string()
    .min(6, {message: "비밀번호는 6자 이상이어야 합니다.",
    }),
    name: z.string().min(1, {message: "이름을 입력해주세요."}),
})
.refine((data)=> data.password === data.passwordCheck, {
        message: "비밀번호가 일치하지 않습니다.",
        path:["passwordCheck"],
    });

type FormFields = z.infer<typeof schema>

export const SignUpPage = () => {
    const navigate = useNavigate();

    const [ passwordVisible, setPasswordVisible ] = useState(false);
    const [ passwordCheckVisible, setPasswordCheckVisible ] = useState(false);

    const {register, handleSubmit, formState: { errors, isSubmitting , isValid },} = useForm<FormFields>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            passwordCheck: "",
        },
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    const onSubmit:SubmitHandler<FormFields> = async (data) => {
        const {passwordCheck, ...rest} = data;

        const response = await postSignup(rest);
        console.log(response);

        navigate("/");
    };

    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
           <div className="w-[300px] relative flex justify-center text-white mb-2">
                <button
                onClick={() => navigate(-1)}
                className="absolute left-0 text-2xl cursor-pointer hover:text-gray-300 transition-colors"
                >
                    &lt;
                </button>
                <span className="text-lg font-medium">회원가입</span>
            </div>
            <div className="flex flex-col gap-3">
                <input
                {...register("email")}
                className={`border border-[#ccc] w-[300px] p-[10px] bg-gray-950 text-gray-100 focus: border-[#807bff] rounded-sm
                    ${errors?.email ? "border-blue-300 border-2" : "border-gray-300"}`}
                type={"email"}
                placeholder={"이메일을 입력해주세요!"}
                />
                {errors.email && <div className={"text-red-500 text-sm"}>{errors.email.message}</div>}
                <div className="relative">
                    <input
                    {...register("password")}
                    className={`border border-[#ccc] w-[300px] p-[10px] bg-gray-950 text-gray-100 focus: border-[#807bff] rounded-sm
                        ${errors?.password ? "border-blue-300 border-2" : "border-gray-300"}`}
                    type={ passwordVisible ? "text" : "password" }
                    placeholder={"비밀번호를 입력해주세요!"}
                    />
                    <button
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-200"
                    >
                        { passwordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                    </button>
                    {errors.password && <div className={"text-red-500 text-sm"}>{errors.password.message}</div>}
                </div>
                <div className="relative">
                    <input
                    {...register("passwordCheck")}
                    className={`border border-[#ccc] w-[300px] p-[10px] bg-gray-950 text-gray-100 focus: border-[#807bff] rounded-sm
                        ${errors?.passwordCheck ? "border-blue-300 border-2" : "border-gray-300"}`}
                    type={ passwordCheckVisible ? "text" : "password" }
                    placeholder={"비밀번호를 확인"}
                    />
                    <button
                    onClick={() => setPasswordCheckVisible(!passwordCheckVisible)}
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-200"
                    >
                        { passwordCheckVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                    </button>
                    {errors.passwordCheck && <div className={"text-red-500 text-sm"}>{errors.passwordCheck.message}</div>}
                </div>
                <input
                {...register("name")}
                className={`border border-[#ccc] w-[300px] p-[10px] bg-gray-950 text-gray-100 focus: border-[#807bff] rounded-sm
                    ${errors?.password ? "border-blue-300 border-2" : "border-gray-300"}`}
                type={"name"}
                placeholder={"이름를 입력해주세요!"}
                />
                {errors.name && <div className={"text-red-500 text-sm"}>{errors.name.message}</div>}
                
                <button
                disabled={!isValid || isSubmitting}
                type="button"
                onClick={handleSubmit(onSubmit)}
                className="w-full bg-pink-500 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-600 transition-colors cursor-pointer disabled:bg-gray-300"
                >
                    회원가입
                </button>
            </div>
        </div>
    )
}
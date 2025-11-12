import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod"
import { postSignup } from "../apis/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { BackButton } from "../components/BackButton";

const schema = z.object({
    name: z.string().min(1, {message: "이름을 입력해주세요."}),

});

type FormFields = z.infer<typeof schema>

const SignupNamePage = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const {email, password} = location.state;

    const {
        register, 
        handleSubmit, 
        formState: {errors, isSubmitting, isValid} // isSubmitting : 버튼 로딩 처리
    } = useForm<FormFields>({ // react-hook-form의 useForm
        defaultValues : {
            name: "",
        },
        resolver: zodResolver(schema), // schema 정의에 위반시 에러 메세지
        mode : "onChange"
    });


    const onSubmit:SubmitHandler<FormFields> = async (data) => {
        // eslint-disable-next-line
        try {
            const user = {email,password,name:data.name};
            const response = await postSignup(user)
            console.log(response);

            navigate("/");
        } catch(error) {
            console.log(error);
            alert("이미 존재하는 유저입니다")
        }
        

        
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4 mt-20">
            <div className="flex flex-col gap-3 items-center">
                <div className="relative flex w-[300px] items-center justify-center m-3">
                    <div className="absolute left-0">
                        <BackButton />
                    </div>
                    <h1 className="font-bold text-2xl">
                    회원가입
                    </h1>
                </div>
                <img 
                    className=" size-60 rounded-full border-2 border-gray-500"
                    />
                <input 
                    {...register('name')}
                    type={"name"}
                    className={`w-full pr-10 border border-[#ccc] p-2 focus:border-[#807bff] rounded-sm
                    ${errors?.name ? "border-red-500 bg-red-200" : "border-gray-300"}`} 
                    placeholder={"이름"}
                />
                {errors.name && <div className="text-red-500 text-sm">{errors.name.message}</div>}

                <button 
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    disabled={!isValid || isSubmitting}
                    className="w-full bg-[#4f4e6c] text-white py-3 rounded-md hover:bg-[#403f6a] text-lg font-medium transition-colors cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                    회원가입 완료
                </button>
            </div>
        
        </div>
    )
}

export default SignupNamePage

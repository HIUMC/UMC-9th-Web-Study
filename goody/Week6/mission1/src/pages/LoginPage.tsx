import useForm from "../hooks/useForm";
import { validateSignin, type UserSigninInformation } from "../utils/validate";
import { BackButton } from "../components/BackButton";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LoginPage = () => {

    const{login, accessToken} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // 이전 경로 저장
    const fromPath = location.state?.from || location.state?.location?.pathname || "/my";

    // 이미 로그인 해있을 시 홈으로 이동
    useEffect(()=>{
        if(accessToken){
            navigate(fromPath, { replace: true });
        }
        

    },[navigate,accessToken,fromPath])

    const { values, errors, touched, getInputProps } = useForm<UserSigninInformation>({
        initialValues: {
            email: "",
            password: "",
        },
        validate: validateSignin
    })



    const handleSubmit = async () => {
        try{
            await login(values);
            // 이전 경로 받아오고 없으면 홈으로 이동
            const fromPath = sessionStorage.getItem("redirectPath");
            if(fromPath){
                sessionStorage.removeItem("redirectPath")
                navigate(fromPath, { replace: true });
            }
            else {
                navigate("/my");
            }
        } catch(error){
            console.log(error)
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
        
    }

    // 오류가 하나라도 있거나, 입력값이 비어있으면 버튼을 비활성화
    const isDisabled = 
        Object.values(errors || {}).some((error)=>error.length > 0) || // 오류 있으면 true
        Object.values(values).some((value)=> value === ""); // 입력 값 비어있으면 true

    return (
        <div className="flex flex-col items-center justify-center w-full gap-4 mt-20">
            <div className="flex flex-col">
                <div className="relative flex w-[300px] items-center justify-center m-3">
                    <div className="absolute left-0">
                        <BackButton />
                    </div>
                    <h1 className="font-bold text-2xl">
                        로그인
                    </h1>
                </div>
                <button 
                    type="button"
                    className="bg-gray-400 font-semibold text-xl py-5 rounded-sm cursor-pointer"
                    onClick={handleGoogleLogin}
                >
                    <div className="flex items-center justify-center gap-4">
                        <img src={"/images/google_logo.svg"} alt='Google Logo Image'/>
                        <span>구글 로그인</span>
                    </div>
                </button>
                <div className="flex items-center justify-between mt-3">
                    <div className="bg-black h-px w-[120px]" />
                    <div className="text-center text-xl font-semibold">OR</div>
                    <div className="bg-black h-px w-[120px]" />
                </div>
                
            </div>
            
            
            <div className="flex flex-col gap-3">
                <input
                    {...getInputProps('email')} // 값 넣는걸 해줌
                    type={"email"}
                    className={`border border-[#ccc] w-[300px] p-2 focus:border-[#807bff] rounded-sm
                        ${errors?.email && touched?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`} 
                    placeholder={"이메일"}
                />
                {errors?.email && touched?.email && (
                    <div className="text-red-500 text-sm">{errors.email}</div>) }
                <input 
                    {...getInputProps('password')}
                    type={"password"}
                    className={`border border-[#ccc] w-[300px] p-2 focus:border-[#807bff] rounded-sm
                        ${errors?.password && touched?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`} 
                    placeholder={"비밀번호"}
                />
                {errors?.password && touched?.password && (
                    <div className="text-red-500 text-sm">{errors.password}</div>) }
                <button 
                    type="button"
                    onClick={handleSubmit}
                    disabled={isDisabled}
                    className="w-full bg-[#4f4e6c] text-white py-3 rounded-md hover:bg-[#403f6a] text-lg font-medium transition-colors cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed">
                    로그인
                </button>
            </div>

        </div>
    )
}

export default LoginPage

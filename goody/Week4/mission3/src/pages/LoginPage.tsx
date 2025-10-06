import useForm from "../hooks/useForm";
import { validateSignin, type UserSigninInformation } from "../utils/validate";
import { BackButton } from "../components/BackButton";
import { postSignin } from "../apis/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const LoginPage = () => {

    const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken)

    const { values, errors, touched, getInputProps } = useForm<UserSigninInformation>({
        initialValues: {
            email: "",
            password: "",
        },
        validate: validateSignin
    })



    const handleSubmit = async () => {
        console.log(values)
        // api 통신
        // await axios.post('url',values)
        try {
            const response = await postSignin(values)
            // accessToken 저장
            setItem(response.data.accessToken)
            // localStorage, key 를 setItem Hook로 생략
            console.log(response)
        } catch(error){
            alert(error?.message)
        }
        

        
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
                <button className="bg-gray-400 font-semibold text-xl py-5">구글 로그인</button>
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

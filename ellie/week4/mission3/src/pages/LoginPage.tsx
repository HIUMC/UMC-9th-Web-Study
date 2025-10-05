import { useNavigate } from "react-router-dom";
import { postSignin } from "../apis/auth";
import BackButton from "../components/BackButton";
import InputForm from "../components/LoginInputForm";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import useForm from "../hooks/useForm"
import { useLocalStorage } from "../hooks/useLocalStorage";
import validateSignin, { type userSigninInformation } from "../utils/validate";

export default function LoginPage() {
  const {setItem} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken)
  const navigate = useNavigate();
  const {values,errors,touched,getInputProps} = useForm<userSigninInformation>({
    initialValue : {
      email :"",
      password : "",
    },
    validate: validateSignin,
  });

  const handleSubmit= async() => {
    try {
      const response = await postSignin(values);
      setItem(response.data.accessToken);
      navigate("/my")
    } catch(error) {
      alert((error as Error).message);
    }
  }

  // 오류가하나라도 있거나, 입력값이 비어있으면 버튼 비활성화
  const isDisabled =
    Object.values(errors||{}).some((error) => error.length>0) || // 오류가 있으면 true
    Object.values(values).some((value)=>value===""); // 입력값이 비어 있으면 true

  return (
    <div className='flex flex-col items-center justify-center h-full gap-4'>
      <div className="flex flex-col justify-center">
        <div className="relative w-[300px] mb-5">
          <BackButton />
          <h1 className="text-center font-bold text-3xl">로그인</h1>          
        </div>
        <button className="bg-blue-600 text-white py-3 rounded-md text-lg font-medium">Google로 로그인</button>
        <div className="mt-5 flex items-center justify-between">
          <div className="w-[100px] h-px bg-black"/>
          <h2 className="text-center">  OR  </h2>
          <div className="w-[100px] h-px bg-black"/>
        </div>
      </div>
      <div className='flex flex-col gap-3'>
        <InputForm
          name="email"
          type="email"
          placeholder="이메일을 입력하세요"
          error={errors?.email}
          touched={touched?.email}
          getInputProps={getInputProps}
        />
        <InputForm
          name="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          error={errors?.password}
          touched={touched?.password}
          getInputProps={getInputProps}
        />
        <button 
          type='button' 
          onClick={handleSubmit} 
          disabled={isDisabled}
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
        >
          로그인
        </button>
      </div>
    </div>
  )
}

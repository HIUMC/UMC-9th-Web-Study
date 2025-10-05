import { postSignin } from "../apis/auth";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import useForm from "../hooks/useForm";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { validateSignin, type UserSigninInformation } from "../utils/validate";

const LoginPage = () => {
  const {setItem} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const{ values, errors, touched, getInputProps} = useForm<UserSigninInformation>({
    initialValue: {
      email: "",
      password:"",
    },
    validate: validateSignin,
  });

  const handleSubmit = async () => {

    console.log(values);
    try {
      const response = await postSignin(values);
      setItem( response.data.accessToken);
      // 로그인 성공 시 토큰을 로컬 스토리지에 저장
      console.log(response);
    }
    catch (error) {
      alert ("로그인 실패");
    }
  };

  // 오류가 하나라도 있거나, 입력값이 비어있으면 버튼을 비활성화
  const isDisabled = 
    Object.values(errors || {}).some((error) => error.length >0) ||
    // 오류가 있으면 true
    Object.values(values).some((value)=>value === "");
    // 입력값이 비어있으면 true

  return (
      <div className="text-white flex flex-col items-center justify-center gap-3">
        <div className="text-2xl font-bold text-center mb-6">로그인</div>
        {/* 로그인 문자 */}

        <button className="w-[300px] p-[10px] flex items-center justify-center gap-2 border rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" 
          className="w-6 h-6"
          viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.94 0 6.6 1.7 8.1 3.1l6-6C34.2 3.5 29.5 1 24 1 14.7 1 6.9 6.7 3.5 14.7l7.1 5.5C12.4 14.7 17.7 9.5 24 9.5z"/>
            <path fill="#34A853" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.6c-.6 3.2-2.6 5.9-5.4 7.7l8.2 6.4c4.8-4.4 7.1-10.9 7.1-18.6z"/>
            <path fill="#FBBC05" d="M10.6 28.2c-.5-1.5-.8-3-.8-4.7s.3-3.2.8-4.7l-7.1-5.5C2.5 16.6 1.5 20.2 1.5 23.5s1 6.9 2.9 10.2l7.2-5.5z"/>
            <path fill="#4285F4" d="M24 47c6.5 0 12-2.1 16-5.7l-8.2-6.4c-2.3 1.5-5.2 2.4-7.8 2.4-6.3 0-11.6-4.2-13.5-10l-7.2 5.5C6.9 41.3 14.7 47 24 47z"/>
          </svg>  
          <span>구글 로그인</span>
        </button>
        {/* 구글 로그인 버튼 */}


        <div className="w-[300px] flex items-center my-2">
          <div className="h-[1px] bg-gray-300 flex-1"></div>
          <span className="px-3 text-white text-xl font-bold">OR</span>
          <div className="h-[1px] bg-gray-300 flex-1"></div>
        </div>
        {/* OR 구분선 */}

        <input 
          {...getInputProps("email")}
          className={`bg-transparent border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-md 
            ${errors?.email && touched?.email ? "border-red-500" : "border-gray-300"}`} 
            // 오류가 있고, 사용자가 이미 해당 필드를 한번이라도 건드렸다면
          type= "email"
          placeholder="이메일"
        />
        {errors?.email && touched?.email && 
        (<div className="text-red-500 text-sm">{errors.email}</div>)}
        {/* 오류가 있고, 사용자가 이미 해당 필드를 한번이라도 건드렸다면 오류메시지 출력 */}

        <input
          {...getInputProps("password")}
          className={`bg-transparent border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-md ${errors?.password && touched?.password ? "border-red-500" : "border-gray-300"}`}
          type= "password"
          placeholder="비밀번호"
        />
        {errors?.password && touched?.password && 
        (<div className="text-red-500 text-sm">{errors.password}</div>)}

        <button 
        type="button" 
        onClick={handleSubmit} 
        disabled={isDisabled} 
        className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300">
          로그인
        </button>
      {/* 버튼 */}
      </div>
    
  )
}

export default LoginPage


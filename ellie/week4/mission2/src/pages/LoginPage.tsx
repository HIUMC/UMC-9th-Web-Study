import useForm from "../hooks/useForm"
import validateSignin, { type userSigninInformation } from "../utils/validate";

export default function LoginPage() {

  const {values,errors,touched,getIntputProps} = useForm<userSigninInformation>({
    initialValue : {
      email :"",
      password : "",
    },
    validate: validateSignin,
  });

  const handleSubmit= () => {}

  // 오류가하나라도 있거나, 입력값이 비어있으면 버튼 비활성화
  const isDisabled =
    Object.values(errors||{}).some((error) => error.length>0) || // 오류가 있으면 true
    Object.values(values).some((value)=>value===""); // 입력값이 비어 있으면 true

  return (
    <div className='flex flex-col items-center justify-center h-full gap-4'>
      <div className='flex flex-col gap-3'>
        <input 
        {...getIntputProps('email')}
          name="email"
          type={"email"} 
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
          ${errors?.email && touched?.email ? "border-red-500 bg-red-200":"border-gray-300"}`}
          placeholder={"이메일"}
        />
        {errors?.email && touched?.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}
        <input 
          {...getIntputProps('password')}
          type={"password"} 
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
          ${errors?.password && touched?.password ? "border-red-500 bg-red-200":"border-gray-300"}`}
          placeholder={"비밀번호"}
        />
        {errors?.password && touched?.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}
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

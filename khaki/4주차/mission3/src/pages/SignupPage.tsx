import z from "zod"
import {useForm, type SubmitHandler} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSignup } from "../apis/auth";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // lucide-react: 아이콘 라이브러리
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

// zod에서 스키마 : 입력 데이터를 검증하기 위해 규칙을 정의한 객체
// z.object : 여러 필드가 있는 객체를 하나의 스키마로 묶을 때 사용
const schema = z.object({
  email: z.string().email({message:"올바른 이메일 형식이 아닙니다."}),
  // 값이 문자열이어야 함, 문자열이더라도 이메일 형식이어야 함

  password: z.
  string()
  .min(8,
    {message: "비밀번호는 8자 이상이어야 합니다."}
  )
  .max(20,
    {message: "비밀번호는 20자 이하여야 합니다."}
  ),
  // 값이 문자열이어야 함, 문자열 길이가 최소 8자이상, 최대 20자이하
  // message는 각각의 조건 만족 안할시 반환됨

  passwordCheck:z.string()
  .min(8,
    {message: "비밀번호는 8자 이상이어야 합니다."}
  )
  .max(20,
    {message: "비밀번호는 20자 이하여야 합니다."}
  ),

  name : z.string()
  .min(1,{message:"이름을 입력해주세요."}),
})
.refine((data) => data.password === data.passwordCheck,
// refine의 첫 번째 인자는 검증 조건 함수.
// 결과가 true면 → 통과 ✅ /false면 → 실패 ❌ (아래 message가 에러로 들어감)
{
    message: "비밀번호가 일치하지 않습니다.", //조건이 실패했을 때 보여줄 에러 메시지.
    path: ["passwordCheck"],  // 에러 메시지를 어떤 필드에 연결할지 지정
  });
// .refine() : 객체 전체를 대상으로 커스텀 검증 조건을 추가하는 메서드 / z.object({...}) 안에 있는 필드끼리 서로 연관 검증을 하고 싶을 때 사용
// 여기서 data = 사용자가 입력한 전체 값 객체(handleSubmit으로 들어온 입력값)


type FormFields = z.infer<typeof schema>;
// z.infer<스키마 타입> : zod 스키마로부터 ts 타입을 자동 추론함




const SignupPage = () => {
  const [step, setStep] = useState<1|2|3>(1);
  const [showPassword, setShowPassword] = useState(false);

  const {register, handleSubmit,formState:{errors, isSubmitting},watch,getValues} = 
  useForm<FormFields>(
    {// 폼 동작을 커스터마이즈하는 설정 객체들이 들어감
    defaultValues:{name:"", email:"", password:"",passwordCheck:""},
    // defaultValues: 폼의 초기값을 지정(useState처럼 각 필드를 ""(빈 값)으로 시작하게 설정.)
    resolver : zodResolver(schema),
    // RHF의 기본 검증이 아니라 Zod 스키마 기반 검증을 쓰도록 연결.
    mode:'all'
    /* 
    mode: 버튼 누를 때뿐만 아니라 실시간검증 타이밍을 설정해주고 싶을 때
      - "onSubmit" (기본값) → 제출할 때만 검증
      - "onBlur" → input이 focus를 잃었을 때 검증
      - "onChange" → 입력이 바뀔 때마다 검증
      - "onTouched" → 한 번이라도 blur된 후, 변경될 때마다 검증
      - "all" → blur + change 모두 실행
    */
    }
  );
  // <useForm은 단순히 함수 하나가 아니라 폼을 제어하는 모든 기능이 담긴 객체를 반환!!>
  // 1. register: <input>,<textarea>... 등과 같은 폼 요소를 react-hook-form에 '등록'하는 함수.
  // 2. handleSubmit: onSubmit 이벤트를 감싸서 검증 + 제출 로직을 자동 처리해주는 함수.
  // 3. formState: 폼과 관련된 상태들 모음. 그중 errors, isSubmitting을 구조분해 한 것.
  //    - errors: 유효성 검사 실패 시 각 필드별 에러 메시지 모음. 
  //      (RHF에서 resolver: zodResolver(schema)로 연결하면, 스키마의 message들이 자동으로 errors 객체에 들어가요.)
  //    - isSubmitting: 폼 제출 중일 때 true (비동기 요청 처리 중 로딩 스피너 등에 활용).


  const onSubmit: SubmitHandler<FormFields> = async (data)=>{
    const {passwordCheck, ...rest} = data;  // passwordCheck만 빼고 출력하기 위해

    const response = await postSignup(rest);

    console.log(response);  

    navigate('/'); // 회원가입 성공 시 홈으로 이동

  }
  // 사용자가 입력값을 제출했을 때 무슨 동작을 할지 정해둔 함수
  // 1. RHF에서는 그냥 onSubmit 속성에 함수를 넣지 않고, handleSubmit이라는 중간 처리기를 사용
  // 2. handleSubmit이 내부적으로
  //  - 유효성 검증 실행
  //  - 검증 성공 시 우리가 만든 onSubmit(data) 호출
  //  - 검증 실패 시 errors 업데이트 (onSubmit 실행 ❌)
  // 3. 여기서 SubmitHandler<T>는 react-hook-form이 제공하는 이미 완성된 함수 타입
  // 4. 여기서 data는 onSubmit 함수의 매개변수, RHF가 폼에 입력한 모든 값을 객체 형태로 담아서 data로 전달
  //  - 사용자가 버튼 클릭 → <form>의 onSubmit 이벤트 발생
  //  - RHF의 handleSubmit 실행됨 (내부에서 모든 register된 input 값을 모음/검증(resolver/zod 등) 실행)
  //  - 검증 성공 → 우리가 만든 onSubmit(데이터객체)를 호출 (이때 RHF가 data 매개변수를 자동으로 전달)

  const handleNext = () => setStep(2);

  return (
    <div className="text-white flex flex-col items-center justify-center gap-3">
        <div className="text-2xl font-bold text-center mb-6">회원가입</div>
        {/* 회원가입 문자 */}


        {/*step 1: 이메일 입력 */}
        {step === 1 && (
        <>
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
            {...register("email")}
            // register("필드명") = 해당 필드를 RHF에 등록, 관리할 수 있는 props 객체 반환,RHF가 해당 input의 value를 이 values.email과 동기화해서 관리
            // {...register("필드명")} = 그 props를 input에 붙여서 RHF와 연결
            /*
          <input
          name="email"
          onChange={→ 값 바뀔 때 RHF 내부 state 업데이트}
          onBlur={focus 잃을 때 "touched" 상태 업데이트}
          ref={RHF가 input DOM을 직접 참조할 수 있게 연결}
          />  이와 같음
          */
            className={`bg-transparent border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-md ${errors?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
            type= "email"
            placeholder="이메일"
          />
          {errors.email && <div className="text-red-500 text-sm">
          {errors.email.message}
          </div>}

          <button 
          type="button" 
          onClick={handleNext} 
          disabled = {!watch('email') || !!errors.email}
          // watch('필드명') : 해당 필드의 현재 값을 실시간으로 조회하는 함수
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300">
          다음
          </button>
        </>
        )}


        {/* step 2: 비밀번호 입력 */}
        {step === 2 && 
        <>
          <div className="text-center mb-2">
          {getValues('email')}
          </div>
          
          <div className="relative w-[300px]">
            <input
              {...register("password")}
              className={`bg-transparent border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-md ${errors?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
              type= {showPassword ? 'text' : 'password'}
              placeholder="비밀번호"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && 
          <div className="text-red-500 text-sm">
          {errors.password.message}
          </div>}

          <input
          {...register("passwordCheck")}
          className={`bg-transparent border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-md ${errors?.passwordCheck ? "border-red-500 bg-red-200" : "border-gray-300"}`}
          type="text"
          placeholder="비밀번호를 한번 더 입력해주세요."
          />
          {errors.passwordCheck && 
          <div className="text-red-500 text-sm">
        {errors.passwordCheck.message}
          </div>}

          <button 
          type="button" 
          onClick={() => setStep(3)} 
          disabled = {!watch('password') || !watch('passwordCheck') || !!errors.password || !!errors.passwordCheck}
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300">
          다음
          </button>
        </>
        }


        {/* step 3: 이름 입력*/}
        {step === 3 && (
        <>
          <div className="w-40 h-40 mb-4 rounded-full overflow-hidden">
            <img
              src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
              className="w-full h-full object-cover"
            />
          </div>
          <input
          {...register("name")}
          className={`bg-transparent border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-md ${errors?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
          type= "text"
          placeholder="이름"
          />
          {errors.name && 
          <div className="text-red-500 text-sm">
          {errors.name.message}
          </div>}

          <button 
            type="button" 
            onClick={handleSubmit(onSubmit)} 
            disabled = {isSubmitting ||!!errors.name} 
            // isSubmitting = 폼이 “submit 중”일 때 true, 그 외엔 false
            className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300">
            회원가입 완료
          </button>
        </>
        )}
        
    </div>
  )
}

export default SignupPage

/*
<동작 흐름>

1. 사용자가 <input> 등에 값을 입력
  -RHF가 register로 연결된 필드들의 값을 추적
  - 내부적으로 FormFields 객체를 채워둠

2. 사용자가 제출 버튼 클릭 (<button type="submit">)
  - <form>의 onSubmit 속성이 발동

3. handleSubmit(onSubmit) 실행
  - RHF가 유효성 검증 실행
  - 성공 → 우리가 만든 onSubmit(data) 함수 호출
  - 실패 → errors에 메시지 넣고 onSubmit은 실행되지 않음

4. 우리가 만든 onSubmit 함수 내부에서 실제 동작 처리
  - 예: 콘솔 출력, 서버 API 호출, 화면 이동, 알림 띄우기 등
*/

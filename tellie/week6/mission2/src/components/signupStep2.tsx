import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { FormFields } from '../pages/SignupPage';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface SignupStep2Props {
  register: UseFormRegister<FormFields>;
  errors: FieldErrors<FormFields>;
  email: string;
  isDisabled: boolean;
  isSubmitting: boolean;
  onNext: () => void;
}

const SignupStep2 = ({ register, errors, email, isDisabled, isSubmitting, onNext }: SignupStep2Props) => {
  const [passwordToggle, setPasswordToggle] = useState(false);
  const [passwordCheckToggle, setPasswordCheckToggle] = useState(false);

  return (
    <>
      <div className = 'w-full mb-5'>
        <span className = 'text-white text-bold text-[15px] '>✉️ {email}</span>
      </div>
      <div className = 'flex flex-col gap=5 w-full'>
        <div className = 'relative mb-4'>
          <input 
          {...register('password')}
          className = {`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
          ${errors?.password ? 'border-red-500 bg-red-200' : 'border-gray-300'}`}
          type = {passwordToggle ? "text" : "password"} 
          placeholder = {"비밀번호를 입력해주세요!"}
          />
          <button
            type='button'
            className = 'absolute right-0 top-1/2 transform -translate-y-1/2 pr-3 text-gray-400 hover: text-white'
            onClick={() => setPasswordToggle((prev) => !prev)}
          > {passwordToggle ? <Eye size={20} /> : <EyeOff size={20} />}</button>
          {errors.password && (
          <div className = 'text-red-500 text-sm'>{errors.password.message}</div>
          )}
        </div>
        <div className = 'relative'>
          <input 
            {...register('passwordCheck')}
            className = {`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
            ${errors?.passwordCheck ? 'border-red-500 bg-red-200' : 'border-gray-300'}`}
            type = {passwordCheckToggle ? "text" : "password"} 
            placeholder = {"비밀번호를 다시 한 번 입력해 주세요!"}
          />
          <button
            type='button'
            className = 'absolute right-0 top-1/2 transform -translate-y-1/2 pr-3 text-gray-400 hover: text-white'
            onClick={() => setPasswordCheckToggle((prev) => !prev)}
          > {passwordCheckToggle ? <Eye size={20} /> : <EyeOff size={20} />}</button>
          {errors.passwordCheck && (
          <div className = 'text-red-500 text-sm'>{errors.passwordCheck.message}</div>
          )}
        </div>
      </div>

      <div className = 'w-full pt-5'>
        <button 
          disabled={isDisabled || isSubmitting}
          type='button' 
          onClick={onNext} 
          className = "w-full bg-pink-500 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-600 transition-colors cursor-pointer disabled:bg-gray-300"
        >다음</button>
      </div>
    </>
  );
};

export default SignupStep2;
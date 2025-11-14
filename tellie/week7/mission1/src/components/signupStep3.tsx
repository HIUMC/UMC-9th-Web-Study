import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { FormFields } from '../pages/SignupPage';
import { useState, useRef } from 'react';

interface SignupStep3Props {
  register: UseFormRegister<FormFields>;
  errors: FieldErrors<FormFields>;
  isDisabled: boolean;
  isSubmitting: boolean;
  onSubmit: () => void;
}

const SignupStep3 = ({ register, errors, isDisabled, isSubmitting, onSubmit }: SignupStep3Props) => {
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null); 
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageClick = () => {
      fileInputRef.current?.click();
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
          if (profileImageUrl) {
              URL.revokeObjectURL(profileImageUrl);
          }
          const url = URL.createObjectURL(file);
          setProfileImageUrl(url);
      }
  };

  return (
    <>
      <input 
        type='file'
        accept='image/*'
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
      />
      <div className = 'w-full flex justify-center'>
        <img src = {profileImageUrl || "https://w7.pngwing.com/pngs/710/71/png-transparent-profle-person-profile-user-circle-icons-icon-thumbnail.png"}
          alt = "user"
          onClick={handleImageClick}
          className = "w-[150px] h-[150px] object-rover rounded-full border border-[#e43087] cursor-pointer"
        />
      </div>

      <div className = 'flex flex-col gap-5 w-full mt-5'>
        <input 
          {...register('name')}
          className = {`border border-[#ccc] w-full p-[10px] focus:border-[#807bff] rounded-sm
          ${errors?.name ? 'border-red-500 bg-red-200' : 'border-gray-300'}`}
          type = {"text"} 
          placeholder = {"원하는 닉네임을 입력해주세요!"}
        />
        {errors.name && (
          <div className = 'text-red-500 text-sm'>{errors.name.message}</div>
        )}
      </div>

      <div className = 'w-full pt-5'>
        <button 
          disabled={isDisabled || isSubmitting}
          type='button' 
          onClick={onSubmit} 
          className = "w-full bg-pink-500 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-600 transition-colors cursor-pointer disabled:bg-gray-300"
        >회원가입 완료</button>
      </div>
    </>
  );
};

export default SignupStep3;
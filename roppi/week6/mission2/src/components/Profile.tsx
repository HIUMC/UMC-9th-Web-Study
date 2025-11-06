import { useRef } from "react";
import { Controller, type UseFormRegister, type Control, useFormContext } from "react-hook-form";
import pinkProfile from '../assets/pinkIcon.png'
import type { SignUpFormValues } from "../schema/schemas";
import { useNavigate } from "react-router-dom";


interface ProfileInputProps {
  control: Control<SignUpFormValues>;
  register: UseFormRegister<SignUpFormValues>;
}


const ProfileInput = ({ control, register }: ProfileInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { watch, } = useFormContext<SignUpFormValues>();
  const nav = useNavigate();

  const nickname = watch("nickname")?.trim();

  const handleImageClick = () => {
    fileInputRef.current?.click();
  }
  const handleClick = () => {
    nav('/');
  }
const isCompleteEnabled = !!nickname 

return (
    <div className="w-full mt-[20px] flex flex-col gap-[15px] text-white">

      {/* 숨긴 파일 input */}
      <Controller
        name="profileImage"
        control={control}
        render={({ field }) => (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => field.onChange(e.target.files)}
              ref={(e) => {
                field.ref(e);
                fileInputRef.current = e;
              }}
              className="hidden"
            />
            <div className="flex flex-col items-center mt-2">
              <img
                src={
                  field.value?.[0]
                    ? URL.createObjectURL(field.value[0])
                    : pinkProfile
                }
                alt="profile preview"
                className="w-[100px] h-[100px] object-cover rounded-full border border-[#e52582] cursor-pointer hover:opacity-80 transition"
                onClick={handleImageClick}
              />
            </div>
          </>
        )}
      />

      <input
        {...register("nickname", { required: "닉네임을 입력해주세요" })}
        placeholder="닉네임을 입력해 주세요!"
        className="w-full py-[7px] pl-[10px] border border-[#8e8e8e] bg-transparent rounded-sm text-[#cfcfcf] text-[13px] placeholder:text-[#8e8e8e] focus:outline-none"
      />

      {/* 완료 버튼 */}
      <button
        type="submit"
        disabled={!isCompleteEnabled}
        onClick={handleClick}
        className={`w-full py-[7px] text-[11px] rounded-sm mt-2 transition-all
          ${!isCompleteEnabled
            ? 'bg-[#1d1d1d] text-[#8e8e8e] opacity-50 cursor-not-allowed'
            : 'bg-[#e52582] text-white hover:opacity-80 cursor-pointer'}`}
      >
        회원가입 완료
      </button>

    </div>
  );
};

export default ProfileInput;
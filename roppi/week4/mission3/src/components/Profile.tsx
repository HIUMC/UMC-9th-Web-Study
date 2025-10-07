import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import pinkProfile from '../assets/pinkIcon.png'


const ProfileInput = () => {
const [nickname, setNickname] = useState('');
const [profileImage, setProfileImage] = useState<File | null>(null);
const navigate = useNavigate();
const fileInputRef = useRef<HTMLInputElement>(null);

const handleComplete = () => {
  navigate('/');
}
const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setProfileImage(file);
  };

const handleImageClick = () => {
  fileInputRef.current?.click();
}

  return (
    <div className="w-full mt-[20px] flex flex-col gap-[15px] text-white">

      {/* 파일 input은 숨김 */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
              className="hidden"
            />

      <div className="flex flex-col items-center mt-2">
        <img
          src={profileImage ? URL.createObjectURL(profileImage) : pinkProfile}
          alt="profile preview"
          className="w-[100px] h-[100px] object-cover rounded-full border border-[#e52582] cursor-pointer hover:opacity-80 transition"
          onClick={handleImageClick}
        />
      </div>

          <div className="flex flex-col text-sm gap-1">
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력해 주세요!"
              className="w-full py-[7px] pl-[10px] border border-[#8e8e8e] bg-transparent rounded-sm text-[#cfcfcf] text-[13px] placeholder:text-[#8e8e8e] focus:outline-none"
            />
          </div>
          <div className="flex gap-2 mt-1">

            <button
              disabled={!nickname}
              onClick={handleComplete}
              className={`flex-1 py-[7px] text-[11px] rounded-sm transition-all
                ${!nickname
                  ? 'bg-[#1d1d1d] text-[#8e8e8e] opacity-50 cursor-not-allowed'
                  : 'bg-[#e52582] text-white hover:opacity-80 cursor-pointer'}`}
            >
              회원가입 완료
            </button>
          </div>
        </div>
      )
  
};
export default ProfileInput
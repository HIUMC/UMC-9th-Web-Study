import React, { useEffect, useRef, useState } from "react";
import type { RequestPatchMyInfoDto, ResponseMyInfoDto } from "../types/auth";
import { useForm } from "react-hook-form";
import usePatchMyInfo from "../hooks/mutations/usePatchMyInfo";
import { useNavigate } from "react-router-dom";
import { IoSettingsSharp } from "react-icons/io5";
import { useAuth } from "../context/AuthContext";
import { getMyInfo } from "../apis/auth";
import { uploadImageToCloudinary } from "../utils/uploadImageToCloudinary";
import useGetMyInfo from "../hooks/useGetMyInfo";

export default function EditMyInfoPage() {
  const { register, handleSubmit, reset, watch } =
    useForm<RequestPatchMyInfoDto>();
  const { mutate: patchMyInfo } = usePatchMyInfo();
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const avatar = watch("avatar");
  const { accessToken } = useAuth();
  const { data: myInfo } = useGetMyInfo(accessToken); // ✅ 캐시 존재 보장

  const onSubmit = (data: RequestPatchMyInfoDto) => {
    const payload = {
      name: data.name,
      bio: data.bio,
      avatar: preview || data.avatar || null,
    };

    patchMyInfo(payload, {
      onSuccess: () => {
        alert("정보가 수정되었습니다!");
        navigate(-1);
      },
    });
  };

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      setData(response);
      reset({
        name: response.data.name,
        bio: response.data.bio ?? "",
      });
      setPreview(response.data.avatar);
    };

    getData();
  }, [reset]);

  const ReadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("📸 파일 선택 이벤트 발생!");
    const file = e.target.files?.[0];
    if (!file) {
      console.log("❌ 파일 없음");
      return;
    }

    try {
      console.log("🚀 Cloudinary 업로드 시작");
      const imageUrl = await uploadImageToCloudinary(file);
      console.log("✅ 업로드 성공:", imageUrl);
      setPreview(imageUrl);
    } catch (err) {
      console.error("Cloudinary 업로드 실패:", err);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full h-full flex justify-center absolute top-0">
      <div className="mt-20 w-100 rounded-lg bg-gray-700 flex flex-col justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center"
        >
          {/* 파일 업로드 input (화면에는 안 보임) */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={ReadImage}
            className="hidden"
          />

          {/* 클릭하면 input을 트리거하는 버튼 */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer mt-5"
          >
            <img
              src={
                preview
                  ? preview
                  : data?.data.avatar ||
                    "https://www.gravatar.com/avatar/?d=mp&s=200"
              }
              alt="프로필 미리보기"
              className="rounded-full size-30 object-cover cursor-pointer hover:opacity-80 transition"
            />
          </button>

          <input
            {...register("name")}
            placeholder="이름을 입력하세요"
            className="border-2 mt-10 text-white border-white w-70 placeholder:text-white placeholder:pl-3 h-9 rounded-md"
          />

          <input
            {...register("bio")}
            placeholder="상태메시지를 입력하세요"
            className="mt-5 border-2 text-white border-white w-70 placeholder:text-white placeholder:pl-3 h-9 rounded-md"
          />
          <p className="text-white mt-5 ">{data?.data.email}</p>
          <button
            type="submit"
            className="mt-5 text-white w-70 bg-black h-9 rounded-md font-bold text-lg"
          >
            Edit
          </button>
        </form>
      </div>
    </div>
  );
}

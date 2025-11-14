import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { postLp } from "../apis/lp";
import { usePostLp } from "../hooks/mutations/usePostLp";
import type { RequestPostLpDto } from "../types/lp";
import { useNavigate } from "react-router-dom";
import { uploadImageToCloudinary } from "../utils/uploadImageToCloudinary";

export default function PostLpPage() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { mutate: createLp } = usePostLp();

  const ReadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // 업로드 아이콘을 클릭하면 실제 <input type="file">을 클릭하도록
  // input 숨겨도 아이콘 클릭으로 파일 업로드 가능
  const handleUploadClick = () => {
    // 지금 숨겨진 <input>을 클릭한 것처럼 동작
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      console.log("🚀 Cloudinary 업로드 시작");
      const imageUrl = await uploadImageToCloudinary(file);
      console.log("✅ 업로드 성공:", imageUrl);
      setPreview(imageUrl);
    } catch (error) {
      console.error("Cloudinary 업로드 실패:", error);
    }
  };

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      lpName: "",
      lpContent: "",
    },
  });

  const handleAddTag = () => {
    if (tagInput.trim() !== "" && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const onSubmit = async (data: any) => {
    const payload: RequestPostLpDto = {
      title: data.lpName,
      content: data.lpContent,
      thumbnail: preview ?? "", // base64 문자열 or 빈 문자열
      tags,
      published: true,
    };

    createLp(payload, {
      onSuccess: () => {
        console.log("LP 등록 성공!");
        reset();
        setPreview(null);
        setTags([]);
        navigate("/");
      },
      onError: (error: any) => {
        console.error("LP 등록 실패:", error.response?.data || error.message);
      },
    });
  };

  return (
    <div className="absolute top-0 w-full flex flex-col justify-center items-center">
      <div className="w-100 h-140 bg-gray-700 rounded-lg flex flex-col items-center">
        <button
          className="cursor-pointer absolute top-5 right-5 text-gray-200"
          onClick={() => navigate(-1)}
        >
          <IoMdClose size={20} />
        </button>
        <button
          onClick={handleUploadClick}
          className="cursor-pointer text-white mt-20"
        >
          {preview ? (
            <img src={preview} alt="미리보기" className="size-45" />
          ) : (
            <MdOutlineDriveFolderUpload size={120} />
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
            accept="image/*"
          />
        </button>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-5 flex flex-col w-80 gap-5"
        >
          <input
            type="text"
            placeholder="LP Name"
            className="h-10 placeholder:pl-3 pl-3 text-white rounded-md border border-gray-200 placeholder:text-gray-200"
            {...register("lpName")}
          />
          <input
            type="text"
            placeholder="LP Content"
            className="h-10 placeholder:pl-3 pl-3 text-white rounded-md border border-gray-200 placeholder:text-gray-200"
            {...register("lpContent")}
          />
          <div className="flex flex-row gap-4">
            <input
              type="text"
              placeholder="LP Tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="h-10 w-60 placeholder:pl-3 rounded-md border pl-3 text-white border-gray-200 placeholder:text-gray-200"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="cursor-pointer border border-black bg-black  rounded-md text-white h-10 w-20"
            >
              Add
            </button>
          </div>
          <div className="flex flex-row gap-2">
            {tags.map((tag) => (
              <div key={tag} className=" mt-1 text-white">
                <span># {tag}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="cursor-pointer"
                >
                  <IoMdClose />
                </button>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="cursor-pointer w-full border border-black h-13 rounded-md bg-black text-white"
          >
            Add LP
          </button>
        </form>
      </div>
    </div>
  );
}

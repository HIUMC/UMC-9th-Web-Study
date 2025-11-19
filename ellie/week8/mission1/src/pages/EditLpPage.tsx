import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetLpDetail } from "../hooks/useGetLpDetail";
import { useForm } from "react-hook-form";
import usePatchLp from "../hooks/mutations/usePatchLp";
import { useEffect, useRef, useState } from "react";
import type { RequestPatchLpDto } from "../types/lp";
import { IoMdClose } from "react-icons/io";
import { uploadImageToCloudinary } from "../utils/uploadImageToCloudinary";

export default function EditLpPage() {
  const { lpId } = useParams<{ lpId: string }>();
  const { data: lp, isLoading } = useGetLpDetail();
  const { register, handleSubmit, reset } = useForm<RequestPatchLpDto>();
  const { mutate: updateLpMutate } = usePatchLp();
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (lp) {
      reset({
        title: lp.title,
        content: lp.content,
        tags: lp.tags.map((tag) => tag.name),
      });
      setTags(lp.tags.map((tag) => tag.name));
      setPreview(lp.thumbnail);
    }
  }, [lp, reset]);

  const handleAddTag = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newTag = tagInput.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags((prev) => [...prev, newTag]);
      setTagInput("");
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      console.log("🚀 Cloudinary 업로드 시작");
      const imageUrl = await uploadImageToCloudinary(file);
      console.log("✅ 업로드 성공:", imageUrl);
      setPreview(imageUrl); // ✅ Cloudinary URL로 미리보기 변경
    } catch (error) {
      console.error("Cloudinary 업로드 실패:", error);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const onSubmit = (formData: RequestPatchLpDto) => {
    if (!lpId) return;

    const payload: RequestPatchLpDto = {
      title: formData.title,
      content: formData.content,
      tags,
      thumbnail: preview || lp?.thumbnail || "",
    };

    updateLpMutate(
      { lpId: Number(lpId), data: payload },
      {
        onSuccess: () => {
          alert("수정이 완료되었습니다!");
          navigate(`/v1/lps/${lpId}`);
          setTimeout(() => {
            window.location.reload();
          }, 100);
        },
        onError: (error) => {
          console.error(error);
          alert("수정에 실패했습니다.");
        },
      }
    );
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  if (isLoading) return <p className="mt-20 text-white">로딩 중...</p>;

  return (
    <div className="relative bg-gray-700 w-175 h-full rounded-lg flex flex-col justify-center items-center">
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
        {preview && (
          <div className="flex flex-col items-center mt-4">
            <img
              src={preview}
              alt="썸네일 미리보기"
              className="w-[300px] h-[200px] object-cover rounded"
            />
          </div>
        )}
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
        accept="image/*"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 flex flex-col w-80 gap-5"
      >
        <input
          type="text"
          placeholder="LP Name"
          className="h-10 placeholder:pl-3 pl-3 text-white rounded-md border border-gray-200 placeholder:text-gray-200"
          {...register("title")}
        />
        <input
          type="text"
          placeholder="LP Content"
          className="h-10 placeholder:pl-3 pl-3 text-white rounded-md border border-gray-200 placeholder:text-gray-200"
          {...register("content")}
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
          수정하기
        </button>
      </form>
    </div>
  );
}

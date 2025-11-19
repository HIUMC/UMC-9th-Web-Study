import { useState, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { usePostLp } from "../../hooks/mutations/usePostLp";
import TagInputSection from "../TagInputSection";
import LpImg from '../../assets/LP.png'

interface LpFormData {
  title: string;
  content: string;
  tags: { value: string }[];
}

const AddLpForm = ({ onClose }: { onClose: () => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { mutate: postLp } = usePostLp();

  const { register, handleSubmit, control, reset } = useForm<LpFormData>({
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags",
  });

  const handleImageClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };


  const onSubmit = (data: LpFormData) => {
  const body = {
    title: data.title,
    content: data.content,
    tags: data.tags.map(t => t.value),
    thumbnail: file ? URL.createObjectURL(file) : "https://example.com/default.png",
    published: true,
  };

  postLp(body, {
    onSuccess: () => {
      alert("LP 등록 완료!");
      reset();
      onClose();
    },
    onError: (err) => {
      console.error(err);
      alert("등록 실패");
    },
  });
};


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center gap-5 w-full"
    >
      {/* LP 이미지 */}
      <div
        className="relative flex flex-col items-center justify-center cursor-pointer hover:opacity-80 transition"
        onClick={handleImageClick}
      >
        {file && (
          <img
            src={URL.createObjectURL(file)}
            alt="LP Preview"
            className="absolute right-[-150px] top-0 w-36 h-36 object-cover rounded shadow"
          />
        )}
        <img src={LpImg} className="w-36" />
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* 제목 / 내용 */}
      <input
        {...register("title", { required: true })}
        placeholder="LP 제목"
        className="outline-none text-white  border border-[#8b919a] opacity-70 rounded placeholder:text-[#8b919a] p-2 w-full"
      />
      <textarea
        {...register("content")}
        placeholder="LP 내용"
        className="outline-none text-white border border-[#8b919a] opacity-70 rounded placeholder:text-[#8b919a] p-2 w-full h-20"
      />

      {/* 태그 입력 */}
      <TagInputSection fields={fields} append={append} remove={remove} />

      {/* 제출 버튼 */}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-[#8b919a] text-white rounded hover:bg-blue-700 cursor-pointer mt-3"
      >
        Add LP
      </button>
    </form>
  );
};

export default AddLpForm;

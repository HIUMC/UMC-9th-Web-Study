import { useState } from "react";
import { usePostLp } from "../hooks/mutations/usePostLp";
import type { RequestCreateLpDto } from "../types/lp";
import { usePostUpload } from "../hooks/mutations/usePostUpload";

export const PostingLpModal = ({ onClose }: { onClose: () => void }) => {
  const { mutate, isPending } = usePostLp();
  const { mutateAsync: uploadFile } = usePostUpload();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  
  const isFormValid = title.trim() !== "" && content.trim() !== "";

  const isTagValid = tagInput.trim() !=="";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        setThumbnailFile(file);
        setThumbnailUrl(URL.createObjectURL(file));
    }
  };

  const handleAddTag = () => {
    const tag = tagInput.trim();
    if (tag && !tags.includes(tag)) {
        setTags([...tags, tag]);
        setTagInput("");
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let uploadURL = "";

    if (thumbnailFile) {
      const formData = new FormData();
      formData.append("file", thumbnailFile);
      
        try {
            const { data } = await uploadFile(formData);
            uploadURL = data.imageUrl;
        } catch (err) {
            console.error("썸네일 업로드 실패", err);
            alert("썸네일 업로드 실패");
        }
    }

    const body: RequestCreateLpDto = {
      title,
      content,
      thumbnail: uploadURL || thumbnailUrl,
      tags,
      published: true,
    };

    mutate(body, {
      onSuccess: () => {
        alert("LP가 생성되었습니다");
        onClose();
      },
      onError: (error: any) => {
        console.error("LP 생성 실패:", error);
        alert("LP 생성에 실패했습니다");
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center bg-black/40 justify-center" onClick={onClose}>
        <div
            className="bg-neutral-800 rounded-2xl shadow-2xl p-6 w-[500px] max-w-[90%] text-gray-200"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="flex justify-end items-center mb-4">
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-600 transition-colors"
                >
                    ✕
                </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex justify-center">
                {thumbnailUrl ? (
                    <div className="relative">
                        <img
                            src={thumbnailUrl}
                            alt="미리보기"
                            className="w-[250px] h-[250px] object-cover rounded border"
                        />
                        <button
                            type="button"
                            onClick={() => {
                                setThumbnailFile(null);
                                setThumbnailUrl("");
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                        >
                            ✕
                        </button>
                    </div>
                ) : (
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="mx-auto w-[250px] h-[250px] border p-2 rounded focus:ring-2 focus:ring-blue-400"
                    />
                )}
            </div>
                <input
                    type="text"
                    placeholder="LP Name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
                    required
                />
                <textarea
                    placeholder="LP Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="border p-2 rounded resize-none focus:ring-2 focus:ring-blue-400"
                    rows={1}
                    required
                />
                <div className="flex gap-2 items-center">
                    <input
                        type="text"
                        placeholder="LP Tag"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        className="border p-2 rounded focus:ring-2 focus:ring-blue-400 flex-1"
                    />
                    <button
                        type="button"
                        onClick={handleAddTag}
                        disabled={!isTagValid}
                        className={`px-5 py-2 rounded
                            ${isTagValid 
                                ? "bg-pink-500 text-white hover:bg-pink-600 transition-colors cursor-pointer"
                                : "bg-gray-500 text-gray-300 cursor-not-allowed"}`}
                    >   
                        Add
                    </button>
                </div>

                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="border px-2 py-1 rounded flex items-center gap-1"
                        >
                            {tag}
                            <button
                                type="button"
                                onClick={() => handleRemoveTag(tag)}
                                className="text-gray-300 hover:text-white cursor-pointer"
                            >
                                ✕
                            </button>
                        </span>
                    ))}
                </div>

                <button
                    type="submit"
                    disabled={!isFormValid || isPending}
                    className={`
                        rounded py-2 mt-3 transition-colors
                        ${isFormValid && !isPending
                            ? "bg-pink-500 text-white hover:bg-pink-600 transition-colors cursor-pointer"
                            : "bg-gray-500 text-gray-300 cursor-not-allowed"}
                        `}
                >
                    Add LP
                </button>
            </form>
        </div>
    </div>
  );
};

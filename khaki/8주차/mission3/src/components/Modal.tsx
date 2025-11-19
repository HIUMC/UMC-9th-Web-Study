import { useState } from "react";
import useCreateLp from "../hooks/mutations/useCreateLp";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ isOpen, onClose }: ModalProps) => {
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [lpName, setLpName] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const { mutate } = useCreateLp();

  if (!isOpen) return null;

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnail(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      {
        title: lpName,
        content,
        thumbnail,
        tags,
        published: true,
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm" onClick={onClose}>
      <div className="relative bg-gray-800 w-96 h-130 rounded-xl p-8" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-white">
          X
        </button>
        <form className="flex flex-col gap-4 mt-8" onSubmit={handleSubmit}>
          <label htmlFor="lp-image" className="text-white text-sm mb-1">
            클릭하여 lp사진을 첨부하시오
          </label>
          <input
            id="lp-image"
            type="file"
            onChange={handleFileChange}
            className="px-3 py-2 rounded bg-gray-700 text-white focus:outline-none"
          />
          <input
            type="text"
            placeholder="LP Name"
            value={lpName}
            onChange={(e) => setLpName(e.target.value)}
            className="px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none resize-none h-24"
          />
          <div className="flex flex-row gap-2">
            <input
              type="text"
              placeholder="Tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="flex-1 px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-3 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
            >
              Add
            </button>
          </div>
          {tags && (
            <div className="flex flex-row flex-wrap gap-2 mt-2">
              {tags.map((tag, idx) => (
                <span key={idx} className="border text-white px-2 py-1 rounded text-xs flex gap-2">
                  {tag}
                  <button
                    className="text-white"
                    type="button"
                    onClick={() => {
                      setTags(tags.filter((t) => t !== tag));
                    }}
                  >
                    x
                  </button>
                </span>
              ))}
            </div>
          )}
          <button type="submit" className="bg-pink-500 text-white px-2 py-1 rounded text-xl w-full mt-4">
            ADD LP
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;

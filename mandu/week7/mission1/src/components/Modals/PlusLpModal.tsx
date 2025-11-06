import { useState, type ChangeEvent } from "react";
import { LuX } from "react-icons/lu";

interface PlusLpModalProps {
  onClose: () => void;
}

const PlusLpModal = ({ onClose }: PlusLpModalProps) => {
  const handleClose = (e: MouseEvent) => {
    e.stopPropagation();
  };
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState<string>("");

  const handleTagInput = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentTag(e.target.value);
  };
  const handleAddTag = () => {
    // 1. 빈 태그나 이미 포함된 태그는 추가하지 않음
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
    }
    // 2. Input을 비움
    setCurrentTag("");
  };
  const handleRemoveTag = (tagToRemove: string) => {
    // filter를 사용해 tagToRemove와 일치하지 않는 태그들만 모아 새 배열을 만듭니다.
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
      >
        <div
          onClick={handleClose}
          className="relative flex flex-col w-full max-w-md overflow-hidden bg-gray-800 rounded-lg shadow-xl"
        >
          <button
            className="absolute top-4 right-4 z-10 text-gray-400 transition-colors cursor-pointer hover:text-gray-300"
            aria-label="모달 닫기"
            onClick={onClose}
          >
            <LuX size={24} />
          </button>

          <div className="w-full h-80 bg-gray-800">
            <label
              htmlFor="pic" // input의 id와 연결
              className="flex items-center justify-center w-full h-80 transition-colors bg-gray-700 cursor-pointer hover:bg-gray-600"
            >
              {/* state에 미리보기 URL이 있으면 img 태그를, 없으면 텍스트를 보여줍니다. */}
              <span className="text-gray-400">+ 앨범 커버 추가</span>
            </label>

            {/* 👇 6. [수정] 실제 input 태그는 숨깁니다. (label로 대신 클릭) */}
            <input
              type="file"
              id="pic"
              className="hidden" // 중요: 화면에서 숨김
              accept="image/*" // 이미지 파일만 받도록 설정
            />
          </div>

          <div className="">
            <form className="p-6 space-y-4 overflow-y-auto">
              <input
                type="text"
                id="name"
                placeholder="LP Name"
                className="w-full p-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              ></input>
              <input
                type="text"
                id="content"
                placeholder="LP Content"
                className="w-full p-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              ></input>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  id="tag"
                  placeholder="LP Tag"
                  value={currentTag}
                  onChange={handleTagInput}
                  className="w-full p-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
                ></input>
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 font-bold bg-pink-400 disabled:bg-gray-400 rounded-md transition-colors hover:bg-pink-600"
                  disabled={currentTag.trim() === ""}
                >
                  Add
                </button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2 border-gray-700">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm text-white border border-gray-600 bg-gray-700 rounded-md"
                    >
                      {tag}

                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)} // 4. 핸들러 연결
                        className="ml- cursor-pointer text-gray-400 transition-colors rounded-full hover:text-white"
                        aria-label={`태그 ${tag} 삭제`}
                      >
                        <LuX size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </form>
            <div className="p-6">
              <button
                type="submit"
                className="w-full py-3 bg-pink-400 font-bold rounded-md cursor-pointer transition-colors hover:bg-pink-600"
              >
                Add Lp
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlusLpModal;

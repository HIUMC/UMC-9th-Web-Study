import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { LuX } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import usePostLp from "../../hooks/mutations/usePostLp";

interface PlusLpModalProps {
  onClose: () => void;
}

const PlusLpModal = ({ onClose }: PlusLpModalProps) => {
  // 폼 데이터
  const [name, setName] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [published, setPublished] = useState<boolean>(true);

  // File 객체를 저장할 state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // blob: URL 문자열을 저장할 state
  const [imagePreview, setImagePreview] = useState<string>("");

  const navigate = useNavigate();
  const { mutate, isPending } = usePostLp();

  // [수정] 파일 변경 핸들러
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file); // 1. File 객체 저장

      // 2. 기존 blob: URL이 있다면 메모리에서 해제 (메모리 누수 방지)
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }

      // 3. File 객체로 새 blob: URL 생성
      const newBlobUrl = URL.createObjectURL(file);
      setImagePreview(newBlobUrl); // 4. blob: URL 문자열을 state에 저장
    }
  };

  // [추가] 컴포넌트가 사라질 때 blob: URL을 메모리에서 해제
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // --- 7. 폼 제출 핸들러 추가 ---
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 기본 폼 제출(새로고침) 방지

    // 유효성 검사
    if (!imagePreview.trim() || !name.trim()) {
      alert("앨범 커버와 LP 이름은 필수입니다.");
      return;
    }

    // API로 보낼 데이터 조합
    const newPost = {
      title: name,
      content: content,
      thumbnail: imagePreview,
      tags: tags,
      published: published,
    };

    mutate(newPost, {
      onSuccess: () => {
        // 3. 훅의 onSuccess가 실행된 후, 추가로 이 작업을 실행합니다.
        onClose();
        navigate("/");
      },
    });
  };

  // 모달 닫기
  const handleClose = (e: MouseEvent) => {
    e.stopPropagation();
  };

  // 태그 추가
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
              {imagePreview ? (
                // 1. blob URL로 이미지 미리보기
                <img
                  src={imagePreview}
                  alt="미리보기"
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-gray-400">+ 앨범 커버 추가</span>
              )}
            </label>

            {/* 👇 6. [수정] 실제 input 태그는 숨깁니다. (label로 대신 클릭) */}
            <input
              type="file"
              id="pic"
              className="hidden" // 중요: 화면에서 숨김
              accept="image/*" // 이미지 파일만 받도록 설정
              onChange={handleFileChange}
            />
          </div>

          <div className="">
            <form
              id="lp-form"
              onSubmit={handleSubmit}
              className="p-6 space-y-4 overflow-y-auto"
            >
              <input
                type="text"
                id="name"
                placeholder="LP Name"
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              ></input>
              <input
                type="text"
                id="content"
                placeholder="LP Content"
                onChange={(e) => setContent(e.target.value)}
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
                form="lp-form"
                className="w-full py-3 bg-pink-400 font-bold rounded-md cursor-pointer transition-colors hover:bg-pink-600"
                disabled={isPending}
              >
                {isPending ? "등록 중..." : "Add Lp"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlusLpModal;

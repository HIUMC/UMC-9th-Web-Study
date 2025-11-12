import { useEffect, useRef } from "react";
import { EllipsisVertical, Pencil, Trash2, Check } from "lucide-react";

interface CommentOptionProps {
  isOption: boolean;
  isEditing?: boolean;
  meData: number | undefined;
  authorId: number;
  onChange: () => void;
  onDelete: () => void;
  onModify?: () => void;
  onEditComplete?: () => void;
}

const CommentOption = ({
  isOption,
  isEditing,
  meData,
  authorId,
  onChange,
  onDelete,
  onModify,
  onEditComplete,
}: CommentOptionProps) => {
  const optionRef = useRef<HTMLDivElement>(null);

  // 👇 바깥 클릭 시 옵션 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (optionRef.current && !optionRef.current.contains(e.target as Node)) {
        onChange();
      }
    };

    if (isOption && !isEditing) {
      // 수정 중에는 닫히지 않도록
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOption, isEditing, onChange]);

  // 본인 댓글만 옵션 표시
  if (meData !== authorId) return null;

  if (isEditing) {
    return (
      <div className="relative flex justify-end ml-auto" ref={optionRef}>
        <button
          onClick={onEditComplete}
          className="cursor-pointer transition flex items-center justify-center"
        >
          <Check size={20} />
        </button>
      </div>
    );
  }

  // ✅ 일반 상태
  return (
    <div className="relative flex justify-end ml-auto" ref={optionRef}>
      {!isOption ? (
        <button
          className="cursor-pointer hover:text-gray-400 transition"
          onClick={onChange}
        >
          <EllipsisVertical size={20} />
        </button>
      ) : (
        <>
          <button
            className="cursor-pointer hover:text-gray-400 transition"
            onClick={onChange}
          >
            <EllipsisVertical size={20} />
          </button>

          <div className="absolute right-5 bg-black text-white rounded-md shadow-md p-2 flex flex-row  w-15 z-50">
            <button
              onClick={onModify}
              className="hover:bg-gray-700 rounded p-1 flex items-center gap-1 text-sm w-8 h-8"
            >
              <Pencil size={15} />
            </button>
            <button
              onClick={onDelete}
              className="hover:bg-gray-700 rounded p-1 flex items-center gap-1 text-sm w-8 h-8"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CommentOption;

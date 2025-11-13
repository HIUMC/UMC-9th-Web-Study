import { useEffect, useRef } from "react";
import { EllipsisVertical } from "lucide-react";
import ModifyButton from "../../common/ModifyButton";
import DeleteButton from "../../common/DeleteButton";
import CheckButton from "../../common/CheckButton";

interface CommentOptionProps {
  isOption: boolean;
  isEditing?: boolean;
  meData: number | undefined;
  authorId: number;
  onChange: () => void;
  onDelete: () => void;
  onModify: () => void;
  onEditComplete: () => void;
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
        <CheckButton onClick={onEditComplete} size={20} />
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
            <ModifyButton onClick={onModify} size={15} />
            <DeleteButton onClick={onDelete} size={15} />
          </div>
        </>
      )}
    </div>
  );
};

export default CommentOption;

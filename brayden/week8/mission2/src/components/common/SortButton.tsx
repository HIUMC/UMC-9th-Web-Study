import { PAGINATION_ORDER } from "../../enums/common";

interface SortButtonProps {
  order: "asc" | "desc";
  onSortChange: (order: "asc" | "desc") => void;
}

const SortButton = ({ order, onSortChange }: SortButtonProps) => {
  return (
    <div className="flex flex-row gap-2 justify-end pr-5 pt-4 pb-3">
      {/* 오래된 순 버튼 */}
      <button
        onClick={() => onSortChange(PAGINATION_ORDER.asc)}
        className={`px-3 py-1 rounded-sm border transition-colors duration-200
                  ${
                    order === PAGINATION_ORDER.asc
                      ? "bg-white text-black border-white"
                      : "bg-black text-white border-white"
                  }`}
      >
        오래된 순
      </button>

      {/* 최신 순 버튼 */}
      <button
        onClick={() => onSortChange(PAGINATION_ORDER.desc)}
        className={`px-3 py-1 rounded-sm border transition-colors duration-200
                  ${
                    order === PAGINATION_ORDER.desc
                      ? "bg-white text-black border-white"
                      : "bg-black text-white border-white"
                  }`}
      >
        최신 순
      </button>
    </div>
  );
};

export default SortButton;

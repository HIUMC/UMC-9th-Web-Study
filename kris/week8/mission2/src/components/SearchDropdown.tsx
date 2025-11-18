interface SearchDropdownProps {
  onClose: () => void;
}

export const SearchDropdown = ({ onClose }: SearchDropdownProps) => {
  return (
    <div className="bg-[#1d1d1d] text-white p-4 shadow-lg z-10 flex flex-col">
      <div className="flex flex-row space-x-4 items-center">
        <p>최근 검색어</p>
        <p className="text-gray-400 text-sm cursor-pointer">모두 지우기</p>
      </div>
      <div className="my-2 flex flex-col items-center">
        <p className="my-4 text-sm text-gray-400">
          최근 검색한 내용이 없습니다.
        </p>
      </div>
      <button onClick={onClose} className="cursor-pointer text-sm">
        닫기
      </button>
    </div>
  );
};

const Sidebar = ({
  onClose,
  isOpen,
}: {
  onClose: () => void;
  isOpen: boolean;
}) => {
  return (
    <>
      {/* overlay 배경 */}
      <div
        className={`
          fixed inset-0 
          transition-opacity duration-300
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={onClose} // 배경 클릭 시 닫기
      />

      {/* 실제 사이드바 */}
      <div
        className={`
          fixed top-[50px] left-0 w-[250px] h-full bg-[rgb(34,34,34)] text-white p-4 shadow-lg z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫기 방지
      >
        <button
          onClick={onClose}
          className="text-sm w-full text-gray-400 mb-4 text-right cursor-pointer"
        >
          ✖
        </button>
        <ul className="space-y-3 font-semibold text-[13px]">
          <li>찾기</li>
          <li>마이페이지</li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;

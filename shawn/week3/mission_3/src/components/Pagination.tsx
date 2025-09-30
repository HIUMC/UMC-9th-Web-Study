interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className="flex justify-center items-center space-x-4">
      {/* 이전 페이지 버튼 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md font-medium transition-colors ${
          currentPage === 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gradient-to-r from-pink-300 to-pink-400 text-white hover:from-pink-400 hover:to-pink-500"
        }`}
      >
        이전
      </button>

      {/* 현재 페이지 번호 */}
      <div className="px-4 py-2 bg-gradient-to-r from-green-300 to-green-400 text-white rounded-md font-medium">
        {currentPage}
      </div>

      {/* 다음 페이지 버튼 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-md font-medium transition-colors ${
          currentPage === totalPages
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gradient-to-r from-pink-300 to-pink-400 text-white hover:from-pink-400 hover:to-pink-500"
        }`}
      >
        다음
      </button>
    </div>
  );
};

export default Pagination;

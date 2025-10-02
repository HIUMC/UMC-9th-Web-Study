// 타입 정의 해야하는 이유
// : 타입 정의가 안되어 있으면 any로 추론돼서 에러발생
type BackButtonProps = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

// 부모(Moviepage.tsx)에서 page,setPage 전달받음
export const BackButton = ({page,setPage}:BackButtonProps) => {
  // 1) 이전 버튼
  //   - disabled={page===1} : 1페이지에서는 이전 버튼 비활성화
  //   - 클릭시 1페이지씩 감소
  // 2) <span> : 현재 페이지 번호
  // 3) 다음 버튼
  //   - 항상 활성화
  //   - 클릭시 1페이지씩 증가
  return (
    <div className="flex items-center justify-center gap-6 mt-5">
      <button 
      className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#b2dab1] 
      transition-all duration-200 disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed" 
      disabled={page===1} 
      onClick={() => setPage((prev) => prev-1)}
      >
        {`<`}
      </button>
      <span>{page} 페이지</span>
      <button 
      className="bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#b2dab1] 
      transition-all duration-200 disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed" 
      onClick={() => setPage((prev) => prev+1)}
      >
        {`>`}
      </button>
    </div>
  );
}
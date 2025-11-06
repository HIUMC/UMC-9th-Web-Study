const FloatingButton = () => {
  const handleClick = () => {
    // 여기에 원하는 기능 추가
    console.log("플로팅 버튼 클릭됨");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-10 right-10 w-14 h-14 bg-pink-400 hover:bg-pink-500 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 z-50"
    >
      {/* 하얀 십자가 */}
      <div className="relative">
        <div className="absolute w-6 h-0.5 bg-white transform translate-x-[-50%] translate-y-[-50%] top-1/2 left-1/2"></div>
        <div className="absolute h-6 w-0.5 bg-white transform translate-x-[-50%] translate-y-[-50%] top-1/2 left-1/2"></div>
      </div>
    </button>
  );
};

export default FloatingButton;

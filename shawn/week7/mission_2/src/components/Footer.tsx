/**
 * ========================================
 * 푸터 컴포넌트 (Footer)
 * ========================================
 *
 * 페이지 하단에 표시되는 푸터 컴포넌트입니다.
 * 저작권 정보를 표시합니다.
 */

/**
 * 푸터 컴포넌트
 * 페이지 하단에 저작권 정보를 표시하는 간단한 컴포넌트
 */
const Footer = () => {
  return (
    <footer className="border-t border-[#2a2a2a] bg-black">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center text-gray-400 text-sm">
          {/* 저작권 정보 */}
          <p>&copy; 2025 돌려돌려LP판</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

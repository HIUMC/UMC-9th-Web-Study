import { type ComponentPropsWithoutRef } from "react";
import { X as CloseIcon } from "lucide-react";
import { createPortal } from "react-dom"; // css stacking context와 상관없이 항상 맨 위에 렌더링

interface ModalProps extends ComponentPropsWithoutRef<"div"> {
  onClick: () => void; // 모달 닫기를 수행하는 함수
  variant?: "default" | "comment";
}

export default function Modal({
  children,
  onClick,
  variant = "default",
}: ModalProps) {
  const cssClass =
    variant === "comment"
      ? `
        relative bg-[#28292e]
        rounded-xl px-5 py-10
        w-[700px] max-h-[80vh]
        overflow-y-auto overflow-x-hidden
        [scrollbar-width:none] [-ms-overflow-style:none]
        [&::-webkit-scrollbar]:hidden
      `
      : `
        relative bg-[#28292e]
        rounded-xl px-5 py-10
      `;
  return createPortal(
    // 모달 뒷 배경(블러처리, fixed)
    <div
      onClick={onClick}
      className="fixed inset-0 z-50 flex h-full w-full cursor-default items-center justify-center bg-gray-500/50"
      // fixed(뷰포트 고정) inset-0(모든 방향을 0으로 지정 -> 전체화면 full)
      // z-50(z-50이 최상위 수준의 z-index, 다른 요소들보다 위쪽에 표시)
      // h-full w-full(with inset-0) -> 완전한 풀스크린 오버레이
      // cursor-default : 마우스 커서를 기본 화살표로 고정
      // item-center, justify-center : 세로, 가로 중앙 정렬
      // bg-opacity-50 : 배경색의 투명도를 50% -> 반투명 (x) -> bg-opacity 사라짐
      // bg-gray-500/50 : /50 : 불투명도 50%
      // backdrop-blur-sm : 배경의 뒷부분을 약하게 흐리게 처리
    >
      {/* 모달 프레임 */}
      <section
        // max-h[80vh] -> 모달이 화면 80%이상 커지지 않게
        // overflow-y-auto -> 댓글이 많을 때 모달 내부에서만 스크롤
        // w-[700px] -> 가로 크기 적당히 제한
        className={cssClass}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") e.stopPropagation();
        }}
      >
        {/* 모달 닫기 버튼(X 아이콘) */}
        <button
          className="absolute right-4 top-4 ml-auto text-white"
          onClick={onClick}
        >
          <CloseIcon size={25} />
        </button>
        {/* 모달 안에 들어갈 내용(Props 전달) */}
        {children}
      </section>
    </div>,
    document.body
  );
}

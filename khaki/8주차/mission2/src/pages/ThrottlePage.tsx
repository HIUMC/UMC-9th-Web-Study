import { useEffect, useState } from "react";
import { useThrottle } from "../hooks/useThrottle";

// Throttle 적용해보는 연습 페이지
export const ThrottlePage = () => {
  // Y값 상태(바뀔때마다 리렌더링이 됨)
  const [scrollY, setScrollY] = useState(0);

  // 리렌더마다 useThrottle이 호출은 되나 안에서 useRef, useCallback을 썻기에 값과 함수가 변하진 않음
  const handleScroll = useThrottle(() => {
    setScrollY(window.scrollY);
  }, 2000);

  // 이 useEffect의 목적: 한 번만 실행해서 이벤트 리스너를 등록해라. 그리고 컴포넌트가 언마운트될 때 제거해라
  useEffect(() => {
    // 이벤트 등록 자체가 한번만이지 scroll될 때 마다 handleScroll은 실행됨
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
  // 이 handleScroll이 useCallback으로 변하지 않으니 매번 useEffect가 실행되진 않음

  console.log(scrollY);

  return (
    <div className="h-dvh flex flex-col items-center justify-center text-white ">
      <div>
        <h1>쓰로틀링이 무엇일까요?</h1>
        <p>SrollY:{scrollY}px</p>
      </div>
    </div>
  );
};

/*
<흐름>
  1. 이벤트 발생 시 실행되는 원래함수 + delay를 훅에 넘김
  2. 훅이 throttled 처리된 새로운 함수를 반환
  3. 이벤트 발생 시 그 '새로운 함수'를 실행한다.
*/

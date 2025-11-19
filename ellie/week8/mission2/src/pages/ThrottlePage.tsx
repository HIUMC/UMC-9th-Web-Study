import React, { useEffect, useState } from "react";
import useThrottle from "../hooks/useThrottle";

export default function ThrottlePage() {
  const [scrollY, setScrollY] = useState<number>(0);

  const handleScroll = useThrottle(() => {
    setScrollY(window.scrollY);
  }, 2000);

  console.log("리렌더링");

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="h-dvh flex flex-col items-center justify-center">
      <h1>쓰로틀링이 무엇일까요?</h1>
      <p>ScrollY:{scrollY}px</p>
    </div>
  );
}

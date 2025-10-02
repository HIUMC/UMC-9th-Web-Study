import { useEffect, useState } from "react";

export function useCurrentPath() {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    // 뒤로가기/앞으로가기 같은 브라우저 내비게이션 감지
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return currentPath;
}

import { useEffect, useState } from 'react';

export function useCurrentPath(): string {
  const read = () => window.location.pathname; 
  // const read = window.location.pathname; → 한 번 평가된 고정 값(stale)이 되기 쉬움.
  // const read = () => window.location.pathname; → 호출 시마다 최신 값을 가져와 안전.

  const [path, setPath] = useState<string>(() => read());
  // 게으른 초기화

  useEffect(() => {
    const onChange = () => setPath(read());
    // 뒤/앞으로 가기 + navigateTo가 쏜 popstate 모두 감지
    window.addEventListener('popstate', onChange);
    return () => window.removeEventListener('popstate', onChange);
  }, []);

  return path;
}

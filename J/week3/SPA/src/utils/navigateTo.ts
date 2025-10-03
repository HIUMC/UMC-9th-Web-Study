// utils/navigateTo.ts
export const navigateTo = (path: string): void => {
  window.history.pushState({}, "", path);
  
  // SPA에서는 URL 바뀐 후에도 컴포넌트를 새로 렌더링해야 하므로
  const navEvent = new PopStateEvent("popstate");
  window.dispatchEvent(navEvent);
};
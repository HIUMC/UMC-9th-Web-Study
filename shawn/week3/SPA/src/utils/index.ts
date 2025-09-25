export const getCurrentPath = (): string => {
  return window.location.pathname;
};

export const navigateTo = (path: string): void => {
  window.history.pushState({}, "", path);
  // SPA에서 라우팅이 변경되었음을 알리기 위해 커스텀 이벤트를 발생시킵니다
  window.dispatchEvent(new PopStateEvent("popstate"));
};

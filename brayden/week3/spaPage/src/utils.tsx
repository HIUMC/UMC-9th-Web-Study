/**
 * 현재 브라우저의 경로를 반환합니다.
 * @returns {string} 현재 경로 (e.g., "/about")
 */
export const getCurrentPath = (): string => {
  return window.location.pathname;
};

/**
 * 지정된 경로로 브라우저의 URL을 변경하고, 변경 사항을 애플리케이션에 알립니다.
 * 페이지를 새로고침하지 않고 URL을 업데이트하기 위해 History API를 사용합니다.
 * @param {string} to - 이동할 경로
 */
export const navigateTo = (to: string): void => {
  // history.pushState를 사용하여 브라우저 히스토리에 새 항목을 추가하고 URL을 변경합니다.
  window.history.pushState(null, "", to);

  // 컴포넌트들이 경로 변경을 감지하고 리렌더링할 수 있도록 커스텀 이벤트를 발생시킵니다.
  const navigationEvent = new Event("pathchange");
  window.dispatchEvent(navigationEvent);
};

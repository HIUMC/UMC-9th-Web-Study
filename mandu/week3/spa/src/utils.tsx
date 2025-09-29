export const getCurrentPath = () =>{
    return window.location.pathname;
}

export const navigateTo = (to: string) =>{
    // 브라우저 히스토리에 새 항목을 추가하여 URL을 변경합니다. (페이지 새로고침 없음)
    window.history.pushState({}, '', to);
    // URL 변경을 다른 컴포넌트에 알리기 위한 커스텀 이벤트를 발생시킵니다.
    const navigationEvent = new Event('navigate');
    window.dispatchEvent(navigationEvent);
}
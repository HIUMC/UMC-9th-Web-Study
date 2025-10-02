// navigateTo: pushState를 호출하고 커스텀 이벤트를 발생시키는 유틸 함수
export const navigateTo = (to: string) => {
    window.history.pushState(null, '', to);
    // 'pushstate' 라는 이름의 커스텀 이벤트를 발생시켜 경로 변경을 알림
    window.dispatchEvent(new CustomEvent('popstate'));
    };

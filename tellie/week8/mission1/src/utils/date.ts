// 주어진 날짜를 현재 시간 기준으로 상대 시간으로 변환한다.
export const getRelativeTime = (date: Date | string): string => {
  const now = new Date();
  const targetDate = typeof date === 'string' ? new Date(date) : date;
  const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000);

  // 음수인 경우 (미래 날짜) 또는 1분 미만
  if (diffInSeconds < 0 || diffInSeconds < 60) {
    return '방금 전';
  }

  // 1시간 미만 (분 단위)
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  }

  // 1일 미만 (시간 단위)
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }

  // 1주 미만 (일 단위)
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}일 전`;
  }

  // 1개월 미만 (주 단위)
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks}주 전`;
  }

  // 1년 미만 (개월 단위)
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths}개월 전`;
  }

  // 1년 이상 (년 단위)
  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears}년 전`;
};
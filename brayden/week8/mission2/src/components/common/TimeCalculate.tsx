function timeCalculate(time?: string) {
  if (!time) return; // time이 undefined일 경우 처리 
  const now = new Date();
  const past = new Date(time);
  const second = now.getTime() - past.getTime();
  if (second < 1000 * 60) {
    return `${Math.round(second / 1000)}초 전`;
  }
  if (second < 1000 * 60 * 60) {
    return `${Math.round(second / (1000 * 60))}분 전`;
  }
  if (second < 1000 * 60 * 60 * 24) {
    return `${Math.round(second / (1000 * 60 * 60))}시간 전`;
  }
  if (second < 1000 * 60 * 60 * 24 * 7) {
    return `${Math.round(second / (1000 * 60 * 60 * 24))}일 전`;
  }
  if (second < 1000 * 60 * 60 * 24 * 7 * 4) {
    return `${Math.round(second / (1000 * 60 * 60 * 24 * 7))}주 전`;
  }
  if (second < 1000 * 60 * 60 * 24 * 7 * 4 * 12) {
    return `${Math.round(second / (1000 * 60 * 60 * 24 * 7 * 4))}달 전`;
  }
}

export default timeCalculate;

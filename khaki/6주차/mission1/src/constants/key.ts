// <로컬스토리지/캐시 에 저장할 때 사용할 key 이름들을 한 곳에 상수로 모아둔 파일>
/*
이렇게 하는 이유
   - 오타 방지
   - 유지보수 편함
   - 일관성 유지
   - 자동완성 지원
*/

export const LOCAL_STORAGE_KEY = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
};

export const QUERY_KEY = {
  lps: "lps",
};

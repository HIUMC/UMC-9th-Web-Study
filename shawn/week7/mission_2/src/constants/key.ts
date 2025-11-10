/**
 * ========================================
 * 전역 상수 키 정의
 * ========================================
 *
 * 애플리케이션 전체에서 사용되는 키 값들을 중앙 관리합니다.
 * 오타 방지 및 유지보수 편의성을 위해 사용합니다.
 */

/**
 * LocalStorage에 저장되는 데이터의 키 이름
 * 인증 토큰을 브라우저 로컬 스토리지에 저장할 때 사용
 */
export const LOCAL_STORAGE_KEY = {
  accessToken: "accessToken", // JWT 액세스 토큰 (API 인증에 사용)
  refreshToken: "refreshToken", // JWT 리프레시 토큰 (토큰 갱신에 사용)
};

/**
 * React Query (TanStack Query)의 쿼리 키
 * 데이터 캐싱 및 무효화(invalidation)를 위해 사용
 *
 * 각 API 데이터를 구분하는 고유 식별자 역할을 합니다.
 * 예: queryClient.invalidateQueries([QUERY_KEY.lps])를 호출하면
 *     모든 LP 목록 쿼리가 무효화되고 재요청됩니다.
 */
export const QUERY_KEY = {
  lps: "lps", // LP 목록 데이터
  lp: "lp", // LP 상세 데이터
};

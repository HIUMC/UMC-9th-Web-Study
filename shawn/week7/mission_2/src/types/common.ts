import type { PAGINATION_ORDER } from "../enums/common";

/**
 * API 응답의 공통 구조를 정의하는 제네릭 타입
 * @template T - 실제 데이터의 타입
 */
export type CommonResponse<T> = {
  status: boolean; // 요청 성공/실패 여부
  statusCode: number; // HTTP 상태 코드 (예: 200, 404, 500)
  message: string; // 응답 메시지
  data: T; // 실제 반환되는 데이터
};

/**
 * 커서 기반 페이지네이션을 위한 응답 구조
 * 무한 스크롤 등에서 사용됨
 * @template T - 실제 데이터의 타입
 */
export type CursorBasedResponse<T> = {
  status: boolean; // 요청 성공/실패 여부
  statusCode: number; // HTTP 상태 코드
  message: string; // 응답 메시지
  data: T; // 실제 반환되는 데이터
  nextCursor: number; // 다음 페이지를 가져올 때 사용할 커서 값
  hasNext: boolean; // 다음 페이지가 있는지 여부
};

/**
 * 페이지네이션 요청 시 사용되는 파라미터
 * 리스트 조회 API에서 공통으로 사용
 */
export type PaginationDto = {
  cursor?: number; // 시작 커서 위치 (옵션)
  limit?: number; // 한 번에 가져올 데이터 개수 (옵션)
  search?: string; // 검색 키워드 (옵션)
  order?: PAGINATION_ORDER; // 정렬 순서 (오름차순/내림차순)
};

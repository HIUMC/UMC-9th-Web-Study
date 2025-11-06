import type { PAGINATION_ORDER } from "../enums/common";

export type CommonResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T; // T는 JSON의 data 필드 전체가 됩니다.
};

// 2. JSON의 data 필드 내부 구조를 위한 타입을 만듭니다.
export type CursorBasedResponse<T> = CommonResponse<{
  data: T; // 실제 아이템 배열
  nextCursor: number | null; // null이 올 수도 있으므로 | null 추가
  hasNext: boolean;
}>;

export type PaginationDto = {
  cursor?: number;
  limit?: number;
  search?: string;
  order?: PAGINATION_ORDER;
};

export type LpDetailDto = {
  lpId?: string;
};

// 일반적인 api 응답 타입
export type CommonResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
};

// 커서 기반 페이지네이션을 사용하는 api 응답 타입
export type CursorBasedResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
};

// enum 대신
export type PaginationOrder = "asc" | "desc";

// 페이지네이션 요청 DTO
export type PaginationDto = {
  cursor?: number;
  limit?: number;
  search?: string;
  order?: PaginationOrder;
};

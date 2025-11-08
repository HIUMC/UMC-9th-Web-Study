/**
 * ========================================
 * LP (Landing Page) 관련 API 함수들
 * ========================================
 *
 * LP 목록 조회, LP 상세 조회, LP 댓글 조회 등
 * 랜딩 페이지 게시글과 관련된 모든 API 요청을 처리합니다.
 */

import type { PaginationDto } from "../types/common";
import { axiosInstance } from "./axios";
import type {
  ResponseLpListDto,
  ResponseLpDetailDto,
  ResponseLpCommentsDto,
} from "../types/lp";

/**
 * LP 목록 조회 API
 * 모든 LP 게시글 목록을 페이지네이션하여 가져옵니다.
 *
 * @param paginationDto - 페이지네이션 설정 (cursor, limit, search, order)
 * @returns LP 목록과 페이지네이션 정보 (data, nextCursor, hasNext)
 *
 * 사용 예시:
 * const result = await getLpList({
 *   cursor: 0,
 *   limit: 10,
 *   order: PAGINATION_ORDER.desc
 * });
 * // 무한 스크롤: result.data.hasNext가 true이면 result.data.nextCursor로 다음 페이지 요청
 */
export const getLpList = async (
  paginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get(`/v1/lps`, {
    params: paginationDto, // query string으로 cursor, limit 등을 전달
  });
  return data;
};

/**
 * LP 상세 조회 API
 * 특정 LP 게시글의 상세 정보를 가져옵니다.
 *
 * @param lpId - 조회할 LP의 고유 ID
 * @returns LP의 전체 정보 (제목, 내용, 썸네일, 태그, 좋아요 등)
 *
 * 사용 예시:
 * const lpDetail = await getLpDetail('123');
 * console.log(lpDetail.data.title); // LP 제목
 */
export const getLpDetail = async (
  lpId: string
): Promise<ResponseLpDetailDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
  return data;
};

/**
 * LP 댓글 목록 조회 API
 * 특정 LP에 달린 모든 댓글을 페이지네이션하여 가져옵니다.
 *
 * @param lpId - LP의 고유 ID
 * @param paginationDto - 페이지네이션 설정 (cursor, limit)
 * @returns 댓글 목록과 페이지네이션 정보
 *
 * 사용 예시:
 * const comments = await getLpComments('123', {
 *   cursor: 0,
 *   limit: 20
 * });
 */
export const getLpComments = async (
  lpId: string,
  paginationDto: PaginationDto
): Promise<ResponseLpCommentsDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params: paginationDto, // query string으로 페이지네이션 파라미터 전달
  });
  return data;
};

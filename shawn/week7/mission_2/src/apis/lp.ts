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

/**
 * 이미지 업로드 API (인증 필요)
 * 이미지 파일을 서버에 업로드하고 URL을 받아옵니다.
 *
 * @param file - 업로드할 이미지 파일
 * @returns 업로드된 이미지의 URL
 */
export const uploadImage = async (
  file: File
): Promise<{ data: { imageUrl: string } }> => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await axiosInstance.post("/v1/uploads", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

/**
 * LP 생성 API
 * 새로운 LP를 생성합니다.
 *
 * @param lpData - LP 생성 데이터 (title, content, thumbnail, tags)
 * @returns 생성된 LP 정보
 */
export const createLp = async (lpData: {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published?: boolean;
}): Promise<ResponseLpDetailDto> => {
  const { data } = await axiosInstance.post("/v1/lps", lpData);
  return data;
};

/**
 * LP 수정 API
 * 특정 LP의 정보를 수정합니다.
 *
 * @param lpId - LP의 고유 ID
 * @param lpData - 수정할 LP 데이터
 * @returns 수정된 LP 정보
 */
export const updateLp = async (
  lpId: string,
  lpData: {
    title?: string;
    content?: string;
    thumbnail?: string;
    tags?: string[];
    published?: boolean;
  }
): Promise<ResponseLpDetailDto> => {
  const { data } = await axiosInstance.patch(`/v1/lps/${lpId}`, lpData);
  return data;
};

/**
 * LP 삭제 API
 * 특정 LP를 삭제합니다.
 *
 * @param lpId - LP의 고유 ID
 * @returns 삭제 결과
 */
export const deleteLp = async (lpId: string) => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}`);
  return data;
};

/**
 * 댓글 생성 API
 * 특정 LP에 댓글을 작성합니다.
 *
 * @param lpId - LP의 고유 ID
 * @param content - 댓글 내용
 * @returns 생성된 댓글 정보
 */
export const createComment = async (lpId: string, content: string) => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/comments`, {
    content,
  });
  return data;
};

/**
 * 댓글 수정 API
 * 자신이 작성한 댓글을 수정합니다.
 *
 * @param lpId - LP의 고유 ID
 * @param commentId - 댓글 ID
 * @param content - 수정할 댓글 내용
 * @returns 수정된 댓글 정보
 */
export const updateComment = async (
  lpId: string,
  commentId: number,
  content: string
) => {
  const { data } = await axiosInstance.patch(
    `/v1/lps/${lpId}/comments/${commentId}`,
    {
      content,
    }
  );
  return data;
};

/**
 * 댓글 삭제 API
 * 자신이 작성한 댓글을 삭제합니다.
 *
 * @param lpId - LP의 고유 ID
 * @param commentId - 댓글 ID
 * @returns 삭제 성공 여부
 */
export const deleteComment = async (lpId: string, commentId: number) => {
  const { data } = await axiosInstance.delete(
    `/v1/lps/${lpId}/comments/${commentId}`
  );
  return data;
};

/**
 * LP 좋아요 추가 API
 * 특정 게시글에 좋아요를 추가합니다.
 *
 * @param lpId - LP의 고유 ID
 * @returns 좋아요 추가 결과
 */
export const addLpLike = async (lpId: string) => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);
  return data;
};

/**
 * LP 좋아요 취소 API
 * 특정 게시글에 좋아요를 취소합니다.
 *
 * @param lpId - LP의 고유 ID
 * @returns 좋아요 취소 결과
 */
export const removeLpLike = async (lpId: string) => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);
  return data;
};

/**
 * 내가 좋아요한 LP 목록 조회 API
 * 내가 좋아요한 LP 목록을 조회합니다.
 *
 * @param paginationDto - 페이지네이션 설정
 * @returns 내가 좋아요한 LP 목록
 */
export const getMyLikedLps = async (
  paginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/likes/me`, {
    params: paginationDto,
  });
  return data;
};

/**
 * 내가 생성한 LP 목록 조회 API
 * 내가 생성한 LP 목록을 조회합니다.
 *
 * @param paginationDto - 페이지네이션 설정
 * @returns 내가 생성한 LP 목록
 */
export const getMyCreatedLps = async (
  paginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/user`, {
    params: paginationDto,
  });
  return data;
};

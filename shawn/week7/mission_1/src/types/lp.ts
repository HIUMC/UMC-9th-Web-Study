import type { CommonResponse } from "./common";

// ==================== LP (Landing Page) 관련 타입 ====================

/**
 * LP에 연결된 태그 정보
 * 카테고리나 주제를 나타내는데 사용
 */
export type Tag = {
  id: number; // 태그 고유 ID
  name: string; // 태그 이름 (예: "디자인", "마케팅")
};

/**
 * LP의 좋아요 정보
 * 어떤 사용자가 어떤 LP를 좋아했는지 기록
 */
export type Likes = {
  id: number; // 좋아요 고유 ID
  userId: number; // 좋아요를 누른 사용자 ID
  lpId: number; // 좋아요가 눌린 LP ID
};

/**
 * LP(Landing Page) 게시글의 전체 정보
 * 랜딩 페이지 목록이나 상세 정보에서 사용
 */
export type Lp = {
  id: number; // LP 고유 ID
  title: string; // LP 제목
  content: string; // LP 내용 (본문)
  thumbnail: string; // 썸네일 이미지 URL
  published: boolean; // 공개 여부 (true: 공개, false: 비공개)
  authorId: number; // 작성자 ID
  createdAt: Date; // 생성 일시
  updatedAt: Date; // 마지막 수정 일시
  tags: Tag[]; // 연결된 태그 목록
  likes: Likes[]; // 좋아요 목록
};

/**
 * LP 목록 조회 시 서버로부터 받는 응답 타입
 * 커서 기반 페이지네이션을 사용하여 무한 스크롤 구현
 */
export type ResponseLpListDto = CommonResponse<{
  data: Lp[]; // LP 목록 배열
  nextCursor: number | null; // 다음 페이지를 가져올 커서 (없으면 null)
  hasNext: boolean; // 다음 페이지 존재 여부
}>;

/**
 * LP 상세 조회 시 서버로부터 받는 응답 타입
 * 특정 LP의 모든 정보를 포함
 */
export type ResponseLpDetailDto = CommonResponse<Lp>;

// ==================== 댓글 관련 타입 ====================

/**
 * LP에 달린 댓글 정보
 */
export type Comment = {
  id: number; // 댓글 고유 ID
  content: string; // 댓글 내용
  userId: number; // 댓글 작성자 ID
  lpId: number; // 댓글이 달린 LP ID
  createdAt: Date; // 댓글 작성 일시
  updatedAt: Date; // 댓글 수정 일시
  user?: {
    // 댓글 작성자 정보 (옵션)
    id: number; // 사용자 ID
    name: string; // 사용자 이름
    email: string; // 사용자 이메일
  };
};

/**
 * LP 댓글 목록 조회 시 서버로부터 받는 응답 타입
 * 커서 기반 페이지네이션 사용
 */
export type ResponseLpCommentsDto = CommonResponse<{
  data: Comment[]; // 댓글 목록 배열
  nextCursor: number | null; // 다음 페이지를 가져올 커서
  hasNext: boolean; // 다음 페이지 존재 여부
}>;

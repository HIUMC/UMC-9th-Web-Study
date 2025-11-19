import type { PaginationDto } from "../types/common";
import type { CommentPaginationDto, DeleteCommentDto, DeleteLpResonse, GetLpCommentsDto, PostCommentDto, RequestLpDto, RequestPatchLpDto, RequestPostLpDto, ResponseCommentDeleteDto, ResponseCommentListDto, ResponseCommentUpdateDto, ResponseLikeLpDto, ResponseLpCommentsDto, ResponseLpDetailDto, ResponseLpListDto, UpdateCommentDto } from "../types/lp";
import { axiosInstance } from "./axios";

export const getLpList = async (paginationDto : PaginationDto) :Promise<ResponseLpListDto>=> {
  const { data } = await axiosInstance.get('/v1/lps', {
  params: paginationDto,

  });
  return data;
}

export const getLpDetail = async (id: number) : Promise<ResponseLpDetailDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${id}`);
  return data;
};

// 댓글 목록 조회 API
export const getLpComments = async (
  params: GetLpCommentsDto
): Promise<ResponseLpCommentsDto> => {
  const { lpId, cursor = 0, limit, order } = params;

  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params: { cursor, limit, order },
  });

  return data;
};

export const postLike = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);
  return data;
};

export const deleteLike = async ({ lpId }: RequestLpDto) => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);
  return data;
};


export const postLp = async (body: RequestPostLpDto) => {
  const response = await axiosInstance.post("/v1/lps", body);
  return response.data;
};

export const deleteLp = async ({ lpId }: RequestLpDto 
): Promise<DeleteLpResonse> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}`);
  return data;
};

export const updateLp = async ({
  lpId,
  data,
}: {
  lpId: number;
  data: RequestPatchLpDto;
}) => {
  return await axiosInstance.patch(`/v1/lps/${lpId}`, data);
};

export const getCommentList = async (
  commentDto: CommentPaginationDto
): Promise<ResponseCommentListDto> => {
  const { lpId, ...params } = commentDto; // lpid와 나머지 params(cursor, limit) 분리
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params,
  });

  return data;
};


export const postComment = async (
  commentData: PostCommentDto
): Promise<ResponseCommentListDto> => {
  const { lpId, content } = commentData;
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/comments`, {
    content,
  });

  return data;
};

export const updateComment = async (
  updateComment: UpdateCommentDto
): Promise<ResponseCommentUpdateDto> => {
  const { lpId, commentId, content } = updateComment;

  const { data } = await axiosInstance.patch(
    `/v1/lps/${lpId}/comments/${commentId}`,
    { content }
  );
  return data;
};


export const deleteComment = async (
  payload: DeleteCommentDto
): Promise<ResponseCommentDeleteDto> => {
  const { lpId, commentId } = payload;
  const { data } = await axiosInstance.delete(
    `/v1/lps/${lpId}/comments/${commentId}`
  );
  return data;
};



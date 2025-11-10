import { useQuery } from "@tanstack/react-query";
import { getComment } from "../apis/comment";
import { useParams } from "react-router-dom";
import type {
  ResponseCommentDto,
  ResponseCommentListDto,
} from "../types/comment";

export default function useGetComment() {
  const { lpId } = useParams<{ lpId: string }>();
  return useQuery<ResponseCommentDto[]>({
    queryKey: ["comments", lpId],
    queryFn: async (): Promise<ResponseCommentDto[]> => {
      const res: ResponseCommentListDto = await getComment({
        lpId: Number(lpId),
      });

      console.log("🔍 getComment 응답 구조:", res);
      return res.data.data.flat();
    },
    enabled: !!lpId,
  });
}

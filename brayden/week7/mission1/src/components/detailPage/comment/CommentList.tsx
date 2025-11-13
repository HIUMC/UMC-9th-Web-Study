// components/Comment/CommentList.tsx
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Comment from "./Comment";
import CommentSkeletonList from "../CommentSkeletonList";
import { useGetCommentList } from "../../../hooks/queries/useGetCommentList";
import useGetMyInfo from "../../../hooks/queries/useGetMyInfo";
import { useAuth } from "../../../context/AuthContext";

interface CommentListProps {
  lpId: number;
  order: "asc" | "desc";
}

const CommentList = ({ lpId, order }: CommentListProps) => {
  const { accessToken } = useAuth();
  const { data: me } = useGetMyInfo(accessToken);
  const { data, fetchNextPage, hasNextPage, isPending, isFetchingNextPage } =
    useGetCommentList(lpId, order);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  if (isPending) return <CommentSkeletonList count={5} />;

  return (
    <div className="flex flex-col gap-3 text-white">
      {data?.pages
        ?.map((page) => page.data.data)
        ?.flat()
        ?.map((comment) => (
          <Comment key={comment.id} data={comment} meData={me?.data.id} />
        ))}
      <div ref={ref}>
        {isFetchingNextPage && <CommentSkeletonList count={3} />}
      </div>
    </div>
  );
};

export default CommentList;

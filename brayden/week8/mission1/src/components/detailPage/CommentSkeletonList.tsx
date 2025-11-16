import CommentSkeleton from "./CommentSkeleton";

interface CommentSkeletonListProps {
  count: number;
}

const CommentSkeletonList = ({ count }: CommentSkeletonListProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <CommentSkeleton key={idx} />
      ))}
    </>
  );
};

export default CommentSkeletonList;

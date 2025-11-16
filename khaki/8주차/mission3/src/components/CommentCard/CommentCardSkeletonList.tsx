import { CommentCardSkeleton } from "./CommentCardSkeleton";

interface CommentCardSkeletonListProps {
  count: number;
}

export const CommentCardSkeletonList = ({ count }: CommentCardSkeletonListProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <CommentCardSkeleton key={index} />
      ))}
    </>
  );
};

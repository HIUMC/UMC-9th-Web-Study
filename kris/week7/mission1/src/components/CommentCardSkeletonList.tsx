import { CommentCardSkeleton } from "./CommentCardSkeleton";

interface CommentCardSkeletonListProps {
  count: number;
}

export const CommentCardSkeletonlist = (
  {count}: CommentCardSkeletonListProps
) => {
  return (
    <>
      {new Array(count).fill(0).map((_, idx) => (
        <CommentCardSkeleton key={idx} />
      ))}
    </>
  )
}
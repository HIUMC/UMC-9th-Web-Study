import { LpCardSkeleton } from "./LpCardSkeleton";

interface LpCardSkeletonListProps {
  count: number;
}

export const LpCardSkeletonList = ({ count }: LpCardSkeletonListProps) => {
  return (
    <>
      {new Array(count).fill(0).map((_, index) => (
        <LpCardSkeleton key={index} />
      ))}
    </>
  );
};

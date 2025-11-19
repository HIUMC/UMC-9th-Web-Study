import LpCardSkeleton from "./LpCardSkeleton";

interface LpCardSkeletonListProps {
  count: number;
}

const LpcardSkeletonList = ({ count }: LpCardSkeletonListProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <LpCardSkeleton key={idx} />
      ))}
    </>
  );
}

export default LpcardSkeletonList;
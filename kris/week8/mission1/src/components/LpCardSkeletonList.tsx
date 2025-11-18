import LpCardSkeleton from "./LpCardSkeleton";

interface LpCardSkeletonListProps {
  count: number;
}

const LpCardSkeletonList = ({count}: LpCardSkeletonListProps) => {
  return (
    <>
      <div className="flex flex-wrap">
        {new Array(count).fill(0).map((_, idx) => (
        <LpCardSkeleton key={idx} />
      ))}
      </div>
      
    </>
  )
}

export default LpCardSkeletonList;
import { AreaChart } from "lucide-react";
import LpCardSkeleton from "./LpCardSkeleton";

interface LpCardSkeletonListProps {
  count: number;
}

export default function LpcardSkeletonList({ count }: LpCardSkeletonListProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <LpCardSkeleton key={idx} />
      ))}
    </>
  );
}

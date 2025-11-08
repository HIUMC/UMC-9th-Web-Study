import React from "react";
import CommentSkeleton from "./CommentSkeleton";

interface commentSkeletonListProps {
  count: number;
}

export default function CommentSkeletonList({
  count,
}: commentSkeletonListProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <CommentSkeleton key={idx} />
      ))}
    </>
  );
}

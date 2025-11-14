export const CommentSkeleton = () => {
  return (
    <div className="flex gap-3 items-start animate-pulse p-2">
      <div className="w-10 h-10 bg-neutral-700 rounded-full" />
      <div className="flex flex-col gap-2 w-full">
        <div className="w-1/4 h-4 bg-neutral-700 rounded" />
        <div className="w-3/4 h-4 bg-neutral-700 rounded" />
      </div>
    </div>
  );
};


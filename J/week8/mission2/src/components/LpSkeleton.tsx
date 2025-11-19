export const LpSkeleton = () => (
  <div className="relative overflow-hidden rounded-lg shadow-md bg-neutral-800 animate-pulse">
    <div className="w-full h-[200px]" />
    <div className="p-3 space-y-2">
      <div className="h-4 w-3/4 bg-neutral-700 rounded" />
      <div className="h-3 w-full bg-neutral-700 rounded" />
      <div className="h-3 w-5/6 bg-neutral-700 rounded" />
    </div>
  </div>
);
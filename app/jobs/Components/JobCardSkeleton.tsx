const JobCardSkeleton = () => {
  return (
    <article className="rounded-2xl bg-white px-6 py-5 shadow-sm animate-pulse">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          {/* Title and badges */}
          <div className="flex flex-wrap gap-2">
            <div className="h-5 w-48 bg-gray-200 rounded" />
            <div className="h-5 w-20 bg-gray-200 rounded-full" />
            <div className="h-5 w-16 bg-gray-200 rounded-full" />
          </div>

          {/* Info row */}
          <div className="pt-6 flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center gap-2">
              <div className="h-4 w-4 bg-gray-200 rounded" />
              <div className="h-4 w-16 bg-gray-200 rounded" />
            </div>
            <div className="inline-flex items-center gap-2">
              <div className="h-4 w-4 bg-gray-200 rounded" />
              <div className="h-4 w-20 bg-gray-200 rounded" />
            </div>
            <div className="inline-flex items-center gap-2">
              <div className="h-4 w-4 bg-gray-200 rounded" />
              <div className="h-4 w-28 bg-gray-200 rounded" />
            </div>
          </div>

          {/* ID and closing date */}
          <div className="pt-6">
            <div className="h-3 w-56 bg-gray-200 rounded" />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="h-9 w-24 bg-gray-200 rounded-md" />
          <div className="h-9 w-24 bg-gray-200 rounded-md" />
        </div>
      </div>
    </article>
  );
};

export default JobCardSkeleton;


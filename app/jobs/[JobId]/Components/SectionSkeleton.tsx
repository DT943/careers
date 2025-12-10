type SectionSkeletonProps = {
  lines?: number;
};

const SectionSkeleton = ({ lines = 4 }: SectionSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 p-6 w-full animate-pulse">
      <div className="col-span-2 space-y-2">
        <div className="h-5 w-32 bg-gray-200 rounded" />
        {Array.from({ length: lines }).map((_, idx) => (
          <div key={idx} className="h-4 w-full bg-gray-200 rounded" />
        ))}
      </div>
    </div>
  );
};

export default SectionSkeleton;


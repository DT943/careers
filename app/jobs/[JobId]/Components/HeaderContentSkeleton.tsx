const HeaderContentSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[4.5fr_2fr] gap-4 p-6 w-full max-w-7xl animate-pulse">
      <div className="space-y-3">
        <div className="h-7 w-1/2 bg-gray-200 rounded" />
        <div className="h-4 w-24 bg-gray-200 rounded" />
        <div className="h-4 w-40 bg-gray-200 rounded" />
        <div className="h-4 w-36 bg-gray-200 rounded" />
        <div className="h-4 w-24 bg-gray-200 rounded" />
        <div className="h-4 w-32 bg-gray-200 rounded" />
      </div>
      <div className="space-y-2 flex flex-col items-start lg:items-end">
        <div className="h-10 w-2/3 bg-gray-200 rounded" />
        <div className="h-10 w-2/3 bg-gray-200 rounded" />
        <div className="h-4 w-24 bg-gray-200 rounded" />
        <div className="flex gap-2">
          <div className="h-8 w-8 bg-gray-200 rounded" />
          <div className="h-8 w-8 bg-gray-200 rounded" />
          <div className="h-8 w-8 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
};

export default HeaderContentSkeleton;


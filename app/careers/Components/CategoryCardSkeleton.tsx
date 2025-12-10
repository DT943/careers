const CategoryCardSkeleton = () => {
  return (
    <div className="relative w-full rounded-lg overflow-hidden shadow-lg animate-pulse bg-gray-100">
      <div className="w-full h-72 bg-gray-200" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-gray-300 p-4">
        <div className="h-4 w-1/2 bg-gray-300 rounded" />
      </div>
    </div>
  );
};

export default CategoryCardSkeleton;


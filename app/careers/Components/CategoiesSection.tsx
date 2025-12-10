
import { useMemo } from "react";
import CategoryCard from "./CategoryCard";
import CategoryCardSkeleton from "./CategoryCardSkeleton";
import { useTeams } from "@/hooks/useTeams";

const Categories = () => {
  const { data, isLoading, error } = useTeams();

  const categories = useMemo(() => {
    if (!data?.result) return [];
    return data.result;
  }, [data]);

  return (
    <div className="max-w-7xl mx-auto pt-4 p-1">
      <h2 className="text-3xl font-bold text-center text-primary-1 mb-4">
        Explore Teams
      </h2>
      <p className="font-medium text-center text-primary-1 mb-6">
        Explore our job categories and find a position that aligns with your
        skills, passion, and goals.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-3">
        {isLoading && (
          <>
            <CategoryCardSkeleton />
            <CategoryCardSkeleton />
            <CategoryCardSkeleton />
            <CategoryCardSkeleton />
          </>
        )}

        {!isLoading &&
          !error &&
          categories.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.name}
              imageUrl={category.imageUrl}
            />
          ))}

        {!isLoading && !error && categories.length === 0 && (
          <p className="col-span-4 text-center text-primary-1">
            No teams available right now.
          </p>
        )}

        {error && (
          <p className="col-span-4 text-center text-red-500">
            Failed to load teams.
          </p>
        )}
      </div>
    </div>
  );
};

export default Categories;


import { categoriesData } from "../Helper/ExploresData";
import CategoryCard from "./CategoryCard";

const Categories = () => {
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
        {categoriesData.map((category) => (
          <CategoryCard
            key={category.title}
            title={category.title}
            imageUrl={category.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;

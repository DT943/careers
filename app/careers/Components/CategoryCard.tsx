"use client";
import Image from "next/image";

interface CategoryCardProps {
  title: any;
  imageUrl: any;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ imageUrl, title }) => {
  return (
    <div className="relative w-full rounded-lg overflow-hidden shadow-lg">
      <div
        //className={`absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-90 transition-opacity duration-300`}
        className="absolute bottom-0 h-full left-0 right-0 hover:bg-black/30 transition"
      />
      <Image
        src={imageUrl}
        alt={title}
        width={400}
        height={500}
        className="w-full h-72 object-cover"
      />
      <div className="absolute bottom-0 h-1/3 left-0 right-0 bg-linear-to-b from-[#00253C]/0 to-[#00253C] p-4 text-white">
        <h3 className="text-center text-lg font-semibold text-white pt-6">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default CategoryCard;

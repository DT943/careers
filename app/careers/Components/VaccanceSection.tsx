import { vacancies } from "../Helper/VacanciesData";
import VacancyCard from "./VaccanceCard";
import Link from "next/link";

const Vacancies = () => {
  return (
    <section
      className="bg-primary-900 flex justify-center items-center"
      dir={"ltr"}
    >
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-2 max-w-7xl w-full mt-4 mb-4">
        <div className="flex flex-col justify-center items-center">
          <h1 className="lg:text-3xl text-base font-bold text-white p-2">
            Latest Vacancies{" "}
          </h1>
          <h4 className="lg:text-base text-sm font-medium text-white p-2 mb-2">
            Explore our newest openings{" "}
          </h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4 p-3">
          {vacancies.map((vacancy) => (
            <VacancyCard
              key={vacancy.id}
              title={vacancy.title}
              category={vacancy.category}
              level={vacancy.level}
              id={vacancy.id}
              closingDate={vacancy.closingDate}
              type={vacancy.type}
              posted={vacancy.posted}
              location={vacancy.location}
            />
          ))}
        </div>

        <div className="w-full flex justify-center py-6">
          <Link href={"/jobs"}>
            <button className="px-6 py-3 border border-[#FDFDFC] text-[#FDFDFC] rounded-md text-sm font-medium hover:bg-[#13364B]">
              View all vacancies
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Vacancies;

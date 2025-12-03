import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const ResponsibilitySection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 p-6 w-full">
      <div className="col-span-2">
        <h3 className="text-lg font-semibold text-primary-900">
          KEY RESPONSIBILITIES
        </h3>

        <div className="flex justify-start items-center gap-2 mt-1">
          <IoMdCheckmarkCircleOutline className="text-primary-1" />

          <p className="text-sm font-normal text-primary-900 flex justify-start items-center gap-1">
            Architect and develop microservices that scale and interact
            seamlessly across distributed systems
          </p>
        </div>

        <div className="flex justify-start items-center gap-2 mt-1">
          <IoMdCheckmarkCircleOutline className="text-primary-1" />

          <p className="text-sm font-normal text-primary-900 flex justify-start items-center gap-1">
            Write efficient, maintainable, and high-quality code adhering to
            coding standards and best practices.
          </p>
        </div>

        <div className="flex justify-start items-center gap-2 mt-1">
          <IoMdCheckmarkCircleOutline className="text-primary-1" />

          <p className="text-sm font-normal text-primary-900 flex justify-start items-center gap-1">
            Participate in code reviews and ensure adherence to design patterns,
            security practices, and scalability
          </p>
        </div>

        <div className="flex justify-start items-center gap-2 mt-1">
          <IoMdCheckmarkCircleOutline className="text-primary-1" />

          <p className="text-sm font-normal text-primary-900 flex justify-start items-center gap-1">
            Design and maintain robust database structures (SQL/NoSQL), ensuring
            optimal performance for large datasets.
          </p>
        </div>

        <div className="flex justify-start items-start gap-2 mt-1">
          <IoMdCheckmarkCircleOutline className="text-primary-1" />

          <p className="text-sm font-normal text-primary-900 flex justify-start items-center gap-1">
            Develop and maintain RESTful APIs for internal and external
            services, ensuring compatibility across multiple platforms.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResponsibilitySection;

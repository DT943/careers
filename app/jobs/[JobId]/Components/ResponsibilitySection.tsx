import { IoMdCheckmarkCircleOutline } from "react-icons/io";

type ResponsibilitySectionProps = {
  responsibilities: string[];
};

const ResponsibilitySection = ({ responsibilities }: ResponsibilitySectionProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 p-6 w-full">
      <div className="col-span-2">
        <h3 className="text-lg font-semibold text-primary-900">
          KEY RESPONSIBILITIES
        </h3>

        {(responsibilities.length ? responsibilities : ["No responsibilities listed."]).map(
          (item, idx) => (
            <div className="flex justify-start items-start gap-2 mt-1" key={idx}>
              <IoMdCheckmarkCircleOutline className="text-primary-1" />
              <p className="text-sm font-normal text-primary-900 flex justify-start items-center gap-1">
                {item}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ResponsibilitySection;

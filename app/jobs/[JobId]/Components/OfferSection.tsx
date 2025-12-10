import { IoMdCheckmarkCircleOutline } from "react-icons/io";

type OfferSectionProps = {
  perks: string[];
};

const OfferSection = ({ perks }: OfferSectionProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 p-6 w-full">
      <div className="col-span-2">
        <h3 className="text-lg font-semibold text-primary-900">What We Offer</h3>
        {(perks.length ? perks : ["Perks will be shared soon."]).map((item, idx) => (
          <div className="flex justify-start items-center gap-2 mt-1" key={idx}>
            <IoMdCheckmarkCircleOutline className="text-primary-1" />
            <p className="text-sm font-normal text-primary-900 flex justify-start items-center gap-1">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferSection;

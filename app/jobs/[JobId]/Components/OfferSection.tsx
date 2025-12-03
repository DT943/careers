import { CheckCircleIcon } from "@phosphor-icons/react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const OfferSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 p-6 w-full">
      <div className="col-span-2">
        <h3 className="text-lg font-semibold text-primary-900">
          What We Offer
        </h3>
        <div className="flex justify-start items-center gap-2 mt-1">
          <IoMdCheckmarkCircleOutline className="text-primary-1" />
          <p className="text-sm font-normal text-primary-900 flex justify-start items-center gap-1">
            Competitive salary based on experience
          </p>
        </div>

        <div className="flex justify-start items-center gap-2 mt-1">
          <IoMdCheckmarkCircleOutline className="text-primary-1" />
          <p className="text-sm font-normal text-primary-900 flex justify-start items-center gap-1">
            Health insurance for you and your family
          </p>
        </div>

        <div className="flex justify-start items-center gap-2 mt-1">
          <IoMdCheckmarkCircleOutline className="text-primary-1" />
          <p className="text-sm font-normal text-primary-900 flex justify-start items-center gap-1">
            Annual flight allowance
          </p>
        </div>

        <div className="flex justify-start items-center gap-2 mt-1">
          <IoMdCheckmarkCircleOutline className="text-primary-1" />
          <p className="text-sm font-normal text-primary-900 flex justify-start items-center gap-1">
            Flexible remote work options
          </p>
        </div>

        <div className="flex justify-start items-center gap-2 mt-1">
          <IoMdCheckmarkCircleOutline className="text-primary-1" />
          <p className="text-sm font-normal text-primary-900 flex justify-start items-center gap-1">
            30 days paid vacation
          </p>
        </div>
      </div>
    </div>
  );
};

export default OfferSection;

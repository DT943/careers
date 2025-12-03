import { CheckCircleIcon } from "@phosphor-icons/react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const RequirmentsSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 p-6 w-full">
      <div className="col-span-2">
        <h3 className="text-lg font-semibold text-primary-900">Requirements</h3>

        <div className="flex justify-start items-center gap-2 mt-1">
          <IoMdCheckmarkCircleOutline className="text-primary-1" />
          <p className="text-sm font-normal text-primary-900 flex justify-start items-center gap-1">
            Bachelor's degree in relevant field or equivalent experience
          </p>
        </div>

        <div className="flex justify-start items-center gap-2 mt-1">
          <IoMdCheckmarkCircleOutline className="text-primary-1" />
          <p className="text-sm font-normal text-primary-900 flex justify-start items-center gap-1">
            (3 - 5 years) of professional experience in a similar role
          </p>
        </div>

        <div className="flex justify-start items-center gap-2 mt-1">
          <IoMdCheckmarkCircleOutline className="text-primary-1" />
          <p className="text-sm font-normal text-primary-900 flex justify-start items-center gap-1">
            Strong communication and interpersonal skills
          </p>
        </div>

        <div className="flex justify-start items-center gap-2 mt-1">
          <IoMdCheckmarkCircleOutline className="text-primary-1" />
          <p className="text-sm font-normal text-primary-900 flex justify-start items-center gap-1">
            Proven ability to work effectively in a fast-paced environment
          </p>
        </div>

        <div className="flex justify-start items-center gap-2 mt-1">
          <IoMdCheckmarkCircleOutline className="text-primary-1" />
          <p className="text-sm font-normal text-primary-900 flex justify-start items-center gap-1">
            Fluency in English
          </p>
        </div>
      </div>
    </div>
  );
};

export default RequirmentsSection;

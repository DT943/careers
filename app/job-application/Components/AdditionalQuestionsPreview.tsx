import CustomPreviewInformationContainer from "@/components/CustomPreviewInformationContainer";
import React from "react";

type AdditionalQuestionsPreviewProps = {
  additionalQuestions: {
    worked: string;
    relative: string;
    here: string;
    experience: string;
    startDate: string;
    salary: string;
    description: string;
  };
};

const AdditionalQuestionsPreview: React.FC<AdditionalQuestionsPreviewProps> = ({
  additionalQuestions,
}) => {
  return (
    <CustomPreviewInformationContainer title={"Additional Questions"}>
      <div className="space-y-3 p-4 grid grid-cols-2">
        <div className="flex items-start space-x-2">
          <div className="flex flex-col items-start">
            <span className="font-normal text-[#5F5F5C]">
              Have you worked at FlyCham before?
            </span>
            <span className="font-medium text-primary-900">
              {additionalQuestions.worked}
            </span>
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <div className="flex flex-col items-start">
            <span className="font-normal text-[#5F5F5C]">
              Do you have relatives working at FlyCham?
            </span>
            <span className="font-medium text-primary-900">
              {additionalQuestions.relative}
            </span>
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <div className="flex flex-col items-start">
            <span className="font-normal text-[#5F5F5C]">
              How did you hear about this job?
            </span>
            <span className="font-medium text-primary-900">
              {additionalQuestions.here}
            </span>
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <div className="flex flex-col items-start">
            <span className="font-normal text-[#5F5F5C]">
              Years of experience
            </span>
            <span className="font-medium text-primary-900">
              {additionalQuestions.experience}
            </span>
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <div className="flex flex-col items-start">
            <span className="font-normal text-[#5F5F5C]">
              Earliest start date
            </span>
            <span className="font-medium text-primary-900">
              {additionalQuestions.startDate}
            </span>
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <div className="flex flex-col items-start">
            <span className="font-normal text-[#5F5F5C]">Expected salary</span>
            <span className="font-medium text-primary-900">
              {additionalQuestions.salary}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-start p-4 pb-8">
        <div className="flex flex-col items-start">
          <span className="font-normal text-[#5F5F5C]">
            Why do you want to join FlyCham ?
          </span>
          <span className="font-medium text-primary-900">
            {additionalQuestions.description}
          </span>
        </div>
      </div>
    </CustomPreviewInformationContainer>
  );
};

export default AdditionalQuestionsPreview;

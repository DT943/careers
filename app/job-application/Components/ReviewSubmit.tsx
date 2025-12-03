"use client";
import { ApplicationStepProps } from "@/types/application";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import PersonalInformationPreview from "./PersonalInformationPreview";
import AdditionalQuestionsPreview from "./AdditionalQuestionsPreview";

const userPersonalInfo = {
  fullName: "Mouayad Hawari",
  email: "mouayadhawari@gmail.com",
  phone: "+963 935 679 806",
  location: "Syria, Damascus",
  nationality: "Syrian",
  birthDate: "21-03-1995",
  linkedin: "linkedin.com/in/yourprofile",
  portfolio: "yourwebsite.com",
};

const additionalQuestions = {
  worked: "No",
  relative: "Yes",
  here: "Company website",
  experience: "3-5 years",
  startDate: "15-12-2025",
  salary: "USD 1000 / month",
  description:
    "I am passionate about aviation and have always admired FlyCham's commitment to excellence and innovation in the airline industry. With my background in aviation management and backend development, I believe I can contribute significantly to your digital transformation initiatives while growing professionally in a dynamic environment.",
};

const ReviewSubmit: React.FC<ApplicationStepProps> = ({
  data,
  nextStep,
  prevStep,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg py-8 px-12">
      <div className="text-left justify-center mb-8 max-w-2xl">
        <h1 className="text-2xl font-semibold text-primary-900 mb-4">
          Review your application
        </h1>
        <p className="text-primary-900 text-sm max-w-2xl">
          Please review the details below before submitting your application to
          FlyCham. You can edit any section if something needs to be updated.
        </p>
      </div>

      <div className="flex flex-col gap-y-6">
        <PersonalInformationPreview personalInfo={userPersonalInfo} />
        <AdditionalQuestionsPreview additionalQuestions={additionalQuestions} />
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          className={`flex justify-between items-center gap-1 px-8 py-3 rounded-lg font-semibold border border-[#D4D4D2]/50 text-primary-900 hover:bg-[#F5F5F4]`}
        >
          <ArrowLeftIcon size={20} /> Previous
        </button>

        <button
          onClick={nextStep}
          className={`flex justify-between items-center gap-1 px-8 py-3 rounded-lg border border-primary-1 font-semibold bg-primary-1 text-white hover:opacity-95`}
        >
          Submit application <ArrowRightIcon size={20} />
        </button>
      </div>
    </div>
  );
};

export default ReviewSubmit;

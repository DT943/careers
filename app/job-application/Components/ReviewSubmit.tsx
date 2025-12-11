"use client";
import { ApplicationStepProps } from "@/types/application";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import PersonalInformationPreview from "./PersonalInformationPreview";
import AdditionalQuestionsPreview from "./AdditionalQuestionsPreview";
import { useMemo } from "react";

type ReviewSubmitProps = ApplicationStepProps & {
  onSubmit: () => void;
  applying?: boolean;
};

const ReviewSubmit: React.FC<ReviewSubmitProps> = ({
  data,
  prevStep,
  onSubmit,
  applying,
}: ReviewSubmitProps) => {
  const personalInfo = useMemo(
    () => ({
      fullName: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: `${data.countryPhoneCode ? `${data.countryPhoneCode} ` : ""}${data.phoneNumber}`,
      location: `${data.city}, ${data.country}`,
      nationality: data.nationality,
      birthDate: data.dateOfBirth,
      linkedin: data.linkedinUrl,
      portfolio: data.portfolioUrl,
    }),
    [data]
  );

  const additionalQuestions = useMemo(
    () => ({
      worked: data.hasWorkedBefore === undefined ? "—" : data.hasWorkedBefore ? "Yes" : "No",
      relative: data.hasRelatives === undefined ? "—" : data.hasRelatives ? "Yes" : "No",
      here: data.howHear || "—",
      experience: data.yearsOfExperience || "—",
      startDate: data.whenCanYouStart || "—",
      salary: data.expectedSalary || "—",
      description: data.whyJoin || "—",
    }),
    [data]
  );

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
        <PersonalInformationPreview personalInfo={personalInfo} />
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
          onClick={onSubmit}
          disabled={applying}
          className={`flex justify-between items-center gap-1 px-8 py-3 rounded-lg border border-primary-1 font-semibold bg-primary-1 text-white hover:opacity-95 disabled:opacity-50`}
        >
          {applying ? "Submitting..." : "Submit application"} <ArrowRightIcon size={20} />
        </button>
      </div>
    </div>
  );
};

export default ReviewSubmit;

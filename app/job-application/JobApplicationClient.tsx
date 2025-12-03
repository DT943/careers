"use client";

import { useState } from "react";
import { ApplicationData } from "../../types/application";
import ResumeUploadStep from "./Components/ResumeUploadStep";

import { ArrowLeftIcon, CheckIcon } from "@phosphor-icons/react";
import PersonalInformation from "./Components/PersonalInformation";
import ProfessionalInformation from "./Components/ProfessionalInformation";
import ReviewSubmit from "./Components/ReviewSubmit";
import ApplicationSubmitted from "./Components/ApplicationSubmitted";
import AdditionalQuestions from "./Components/AdditionalQuestions";
import Link from "next/link";

const JobApplicationClient = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    resume: null,
    resumeUrl: "",
    additionalDocuments: [],
    portfolioUrl: "",
    step: 1,
  });

  const updateApplicationData = (data: Partial<ApplicationData>) => {
    setApplicationData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
    updateApplicationData({ step: currentStep + 1 });
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
    updateApplicationData({ step: currentStep - 1 });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ResumeUploadStep
            data={applicationData}
            updateData={updateApplicationData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 2:
        return (
          <PersonalInformation
            data={applicationData}
            updateData={updateApplicationData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <ProfessionalInformation
            data={applicationData}
            updateData={updateApplicationData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );

      case 4:
        return (
          <AdditionalQuestions
            data={applicationData}
            updateData={updateApplicationData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 5:
        return (
          <ReviewSubmit
            data={applicationData}
            updateData={updateApplicationData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 6:
        return <ApplicationSubmitted />;
      default:
        return (
          <ResumeUploadStep
            data={applicationData}
            updateData={updateApplicationData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
    }
  };

  return (
    <div className=" mx-auto p-6 min-h-[83vh]">
      {currentStep != 6 && (
        <>
          <div className="py-8 p-2 flex items-left justify-left lg:items-left lg:justify-left mx-auto max-w-7xl">
            {" "}
            <Link href="/jobs">
              <h5 className=" flex gap-1 items-center text-[#00253C] hover:text-[#3A5A6B] text-sm font-medium">
                <ArrowLeftIcon size={18} /> Back to all jobs
              </h5>
            </Link>
          </div>

          <div className="py-2 p-2 flex justify-left items-left mx-auto max-w-7xl">
            <h5 className=" flex gap-1 items-center text-primary-1 lg:text-3xl font-normal">
              You are applying for{" "}
              <span className="font-bold">Senior Backend Developer</span>
            </h5>
          </div>

          {/* Progress Bar */}

          <div className="py-8 mb-12 mx-auto max-w-5xl">
            <div className="flex justify-between items-center mb-2">
              {[1, 2, 3, 4, 5].map((step) => (
                <div
                  key={step}
                  className={`flex flex-col justify-center items-center ${
                    step < currentStep
                      ? "text-primary-1"
                      : step === currentStep
                      ? "text-primary-1"
                      : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                      step < currentStep
                        ? "bg-primary-1 outline-2 outline-[#054E72] text-white"
                        : step === currentStep
                        ? "bg-primary-1 outline-2 outline-[#054E72] text-white"
                        : "border-gray-300 bg-gray-300 text-gray-500"
                    }`}
                  >
                    {step < currentStep ? <CheckIcon size={18} /> : step}
                  </div>
                  <span className="text-xs lg:max-w-sm max-w-10 absolute mt-24 lg:mt-18 font-medium">
                    {step === 1 && "Select your resume"}
                    {step === 2 && "Personal information"}
                    {step === 3 && "Professional information"}
                    {step === 4 && "Additional Questions"}
                    {step === 5 && "ReView & Submit"}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-[95%] bg-gray-200 -mt-6 ml-5 rounded-full h-1">
              <div
                className="bg-primary-1 h-1 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
              ></div>
            </div>
          </div>
        </>
      )}

      {/* Step Content */}
      <div className="mx-auto max-w-5xl">{renderStep()}</div>
    </div>
  );
};

export default JobApplicationClient;

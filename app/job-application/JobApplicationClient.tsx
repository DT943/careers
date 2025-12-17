"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ApplicationData } from "../../types/application";
import ResumeUploadStep from "./Components/ResumeUploadStep";

import { ArrowLeftIcon, CheckIcon } from "@phosphor-icons/react";
import ReviewSubmit from "./Components/ReviewSubmit";
import ApplicationSubmitted from "./Components/ApplicationSubmitted";
import AdditionalQuestions from "./Components/AdditionalQuestions";
import Link from "next/link";
import { useApplicantProfile, useApplyToJob } from "@/hooks";
import { useAuthStore } from "@/store/useAuthStore";
import {
  applyJobSchema,
  type ApplyJobPayload,
} from "@/validations/applyJobSchema";

const JobApplicationClient = () => {
  const searchParams = useSearchParams();
  const { token } = useAuthStore();
  const jobIdParam = searchParams.get("jobId");
  const jobTitleParam = searchParams.get("title") || "Job Application";

  const { data: profileData } = useApplicantProfile(!!token);
  const { mutateAsync: applyToJob, isLoading: applying } = useApplyToJob();

  const [currentStep, setCurrentStep] = useState(1);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    resume: null,
    resumeUrl: "",
    resumeCode: "",
    selectedAttachmentId: undefined,
    skills: [],
    additionalDocuments: [],
    portfolioUrl: "",
    firstName: "",
    lastName: "",
    email: "",
    countryPhoneCode: "",
    phoneNumber: "",
    country: "",
    city: "",
    dateOfBirth: "",
    nationality: "",
    linkedinUrl: "",
    positions: [],
    educationHistory: [],
    languages: [],
    hasWorkedBefore: undefined,
    hasRelatives: undefined,
    whyJoin: "",
    howHear: "",
    yearsOfExperience: "",
    whenCanYouStart: "",
    expectedSalary: "",
    jobOfferId: jobIdParam ? Number(jobIdParam) : undefined,
    jobTitle: jobTitleParam,
    step: 1,
  });

  const profile = profileData?.result;

  const updateApplicationData = (data: Partial<ApplicationData>) => {
    setApplicationData((prev) => ({ ...prev, ...data }));
  };

  // Ensure jobOfferId is always synced from URL params
  useEffect(() => {
    if (jobIdParam) {
      const jobId = Number(jobIdParam);
      if (!isNaN(jobId)) {
        setApplicationData((prev) => {
          if (prev.jobOfferId !== jobId) {
            return { ...prev, jobOfferId: jobId };
          }
          return prev;
        });
      }
    }
  }, [jobIdParam]);

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
            attachments={profile?.attachments ?? []}
          />
        );
      case 2:
        return (
          <AdditionalQuestions
            data={applicationData}
            updateData={updateApplicationData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <ReviewSubmit
            data={applicationData}
            updateData={updateApplicationData}
            nextStep={nextStep}
            prevStep={prevStep}
            onSubmit={handleSubmit}
            applying={applying}
            attachments={profile?.attachments ?? []}
            submitError={submitError ?? undefined}
          />
        );
      case 4:
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

  const handleSubmit = async () => {
    // Ensure jobOfferId is always available from URL params if missing
    const finalJobOfferId =
      applicationData.jobOfferId ||
      (jobIdParam ? Number(jobIdParam) : undefined);

    if (!finalJobOfferId) {
      console.error(
        "Missing jobOfferId. Please ensure you're applying from a job listing."
      );
      alert("Missing job information. Please apply from a job listing page.");
      return;
    }

    const rawPayload: ApplyJobPayload = {
      JobOfferId: finalJobOfferId,
      ResumeCode: applicationData.resumeCode || "",
      HasWorkedAtFlyChamBefore:
        applicationData.hasWorkedBefore as boolean,
      HasRelativesAtFlyCham:
        applicationData.hasRelatives as boolean,
      WhyWantToJoinFlyCham: applicationData.whyJoin,
      HowDidYouHearAboutJob: applicationData.howHear,
      YearsOfExperience: applicationData.yearsOfExperience,
      whenCanYouStart: applicationData.whenCanYouStart,
      ExpectedSalary: applicationData.expectedSalary,
    };

    const result = applyJobSchema.safeParse(rawPayload);

    if (!result.success) {
      const firstIssue = result.error.issues[0];
      const field = firstIssue?.path?.[0];

      let message: string;
      if (field === "HasWorkedAtFlyChamBefore") {
        message = "Please specify if you have worked at FlyCham before.";
      } else if (field === "HasRelativesAtFlyCham") {
        message = "Please specify if you have relatives at FlyCham.";
      } else if (field === "ResumeCode") {
        message = "Please select a resume before submitting your application.";
      } else {
        message =
          firstIssue?.message ||
          "Please complete all required fields before submitting.";
      }

      setSubmitError(message);
      setCurrentStep(3);
      return;
    }

    setSubmitError(null);

    try {
      await applyToJob(result.data);
      setCurrentStep(4);
    } catch (err: any) {
      console.error("Failed to submit job application:", err);
      setSubmitError(
        err?.response?.data?.message || "Unable to submit application"
      );
    }
  };

  return (
    <div className=" mx-auto p-6 min-h-[83vh]">
      <>
        {currentStep !== 4 && (
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
                <span className="font-bold">{jobTitleParam}</span>
              </h5>
            </div>

            {/* Progress Bar */}

            <div className="py-8 mb-12 mx-auto max-w-5xl">
              <div className="flex justify-between items-center mb-2">
                {[1, 2, 3].map((step) => (
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
                      {step === 2 && "Additional Questions"}
                      {step === 3 && "Review & Submit"}
                    </span>
                  </div>
                ))}
              </div>
              <div className="w-[95%] bg-gray-200 -mt-6 ml-5 rounded-full h-1">
                <div
                  className="bg-primary-1 h-1 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                ></div>
              </div>
            </div>
          </>
        )}

        {/* Step Content */}
        <div className="mx-auto max-w-5xl">{renderStep()}</div>
      </>
    </div>
  );
};

export default JobApplicationClient;

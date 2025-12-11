"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ApplicationData } from "../../types/application";
import ResumeUploadStep from "./Components/ResumeUploadStep";

import { ArrowLeftIcon, CheckIcon } from "@phosphor-icons/react";
import PersonalInformation from "./Components/PersonalInformation";
import ProfessionalInformation from "./Components/ProfessionalInformation";
import ReviewSubmit from "./Components/ReviewSubmit";
import ApplicationSubmitted from "./Components/ApplicationSubmitted";
import AdditionalQuestions from "./Components/AdditionalQuestions";
import Link from "next/link";
import {
  useApplicantProfile,
  useApplyToJob,
} from "@/hooks";
import { useAuthStore } from "@/store/useAuthStore";

const JobApplicationClient = () => {
  const searchParams = useSearchParams();
  const { token } = useAuthStore();
  const jobIdParam = searchParams.get("jobId");
  const jobTitleParam = searchParams.get("title") || "Job Application";

  const { data: profileData } = useApplicantProfile(!!token);
  const { mutateAsync: applyToJob, isLoading: applying } = useApplyToJob();

  const [currentStep, setCurrentStep] = useState(1);
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    resume: null,
    resumeUrl: "",
    resumeCode: "",
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

  useEffect(() => {
    if (profile) {
      setApplicationData((prev) => ({
        ...prev,
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email || "",
        country: profile.country,
        city: profile.city,
        phoneNumber: profile.phoneNumber,
        nationality: profile.nationality,
        dateOfBirth: profile.dateOfBirth?.split("T")[0] ?? "",
        linkedinUrl: profile.linkedInUrl,
        portfolioUrl: profile.portfolioUrl,
        resumeUrl: profile.resumeUrl ?? prev.resumeUrl,
        jobOfferId: prev.jobOfferId || (jobIdParam ? Number(jobIdParam) : undefined),
        positions:
          profile.experiences?.map((exp) => ({
            companyName: exp.company,
            jobTitle: exp.title,
            startDate: exp.startDate?.split("T")[0] ?? "",
            endDate: exp.isCurrentRole ? "" : exp.startDate?.split("T")[0] ?? "",
            currentlyWorkingHere: exp.isCurrentRole,
            description: exp.responsibilities ?? "",
          })) ?? prev.positions,
        educationHistory:
          profile.educations?.map((edu) => ({
            institutionName: edu.institution,
            degree: edu.degree,
            fieldOfStudy: edu.fieldOfStudy,
            startDate: edu.startDate?.split("T")[0] ?? "",
            endDate: edu.endDate?.split("T")[0] ?? "",
            currentlyWorkingHere: false,
          })) ?? prev.educationHistory,
        step: 4,
      }));
      setCurrentStep(4);
    }
  }, [profile, jobIdParam]);

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
            onSubmit={handleSubmit}
            applying={applying}
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

  const handleSubmit = async () => {
    // Ensure jobOfferId is always available from URL params if missing
    const finalJobOfferId = applicationData.jobOfferId || (jobIdParam ? Number(jobIdParam) : undefined);
    
    if (!finalJobOfferId) {
      console.error("Missing jobOfferId. Please ensure you're applying from a job listing.");
      alert("Missing job information. Please apply from a job listing page.");
      return;
    }

    const payload = {
      jobOfferId: finalJobOfferId,
      jobTitle: applicationData.jobTitle,
      resumeCode: applicationData.resumeCode,
      resumeUrl: applicationData.resumeUrl,
      firstName: applicationData.firstName,
      lastName: applicationData.lastName,
      countryPhoneCode: applicationData.countryPhoneCode,
      phoneNumber: applicationData.phoneNumber,
      country: applicationData.country,
      city: applicationData.city,
      nationality: applicationData.nationality,
      dateOfBirth: applicationData.dateOfBirth,
      linkedInUrl: applicationData.linkedinUrl,
      portfolioUrl: applicationData.portfolioUrl,
      yearsOfExperience: applicationData.yearsOfExperience,
      whenCanYouStart: applicationData.whenCanYouStart,
      expectedSalary: applicationData.expectedSalary,
      hasWorkedAtFlyChamBefore: applicationData.hasWorkedBefore,
      hasRelativesAtFlyCham: applicationData.hasRelatives,
      whyWantToJoinFlyCham: applicationData.whyJoin,
      howDidYouHearAboutJob: applicationData.howHear,
      skills: applicationData.skills,
      experiences: applicationData.positions.map((p) => ({
        title: p.jobTitle,
        company: p.companyName,
        startDate: p.startDate,
        endDate: p.endDate,
        isCurrentRole: p.currentlyWorkingHere,
        responsibilities: p.description,
      })),
      educations: applicationData.educationHistory.map((e) => ({
        degree: e.degree,
        institution: e.institutionName,
        fieldOfStudy: e.fieldOfStudy,
        startDate: e.startDate,
        endDate: e.endDate,
        grade: "",
      })),
    };

    await applyToJob(payload);
    setCurrentStep(6);
  };

  return (
    <div className=" mx-auto p-6 min-h-[83vh]">
      {!token ? (
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="max-w-md text-center bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-primary-900 mb-2">
              Access denied
            </h2>
            <p className="text-sm text-primary-900">
              You need to be logged in to apply for jobs.
            </p>
          </div>
        </div>
      ) : (
        <>
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
                  <span className="font-bold">{jobTitleParam}</span>
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
        </>
      )}
    </div>
  );
};

export default JobApplicationClient;

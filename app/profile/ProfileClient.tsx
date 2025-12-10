"use client";

import { useMemo, useState } from "react";
import imagrr from "@/public/images/careers/admin.png";
import Image from "next/image";
import { saveJobs } from "../jobs/Helper/JobsData";
import JobCard from "../jobs/Components/JobCard";
import JobAlertCard from "./Components/JobAlert";
import { PlusCircleIcon } from "@phosphor-icons/react";
import JobApplicationsTable from "./Components/TableApplication";
import CandidateProfile from "./Components/GeneralInfo";
import CandidateProfileSkeleton from "./Components/CandidateProfileSkeleton";
import { useApplicantProfile } from "@/hooks";

type JobAlert = {
  id: number;
  title: string;
  keywords: string;
  workingTime: string;
  jobLevel: string;
  location: string;
  jobCategory: string;
  alertFrequency: string;
  isActive: boolean;
};

const initialAlerts: JobAlert[] = [
  {
    id: 1,
    title: "Backend developer",
    keywords: "Backend",
    workingTime: "full time",
    jobLevel: "Senior-Level",
    location: "Damascus ,Syria",
    jobCategory: "Digital & Technology",
    alertFrequency: "Weekly",
    isActive: true,
  },
  {
    id: 2,
    title: "Full stack developer",
    keywords: "Backend",
    workingTime: "full time",
    jobLevel: "Senior-Level",
    location: "Damascus ,Syria",
    jobCategory: "Digital & Technology",
    alertFrequency: "Weekly",
    isActive: true,
  },
];
const ProfileClient = () => {
  const [activeTab, setActiveTab] = useState("general");

  const [alerts, setAlerts] = useState<JobAlert[]>(initialAlerts);
  const { data, isLoading, error } = useApplicantProfile();

  const profile = data?.result;

  const contactInfo = useMemo(() => {
    if (!profile)
      return {
        fullName: "",
        email: "",
        location: "",
        mobilePhone: "",
        birthDate: "",
        nationality: "",
        address: "",
        portfolioUrl: "",
        linkedinUrl: "",
      };

    return {
      fullName: `${profile.firstName} ${profile.lastName}`,
      email: profile.email,
      location: `${profile.city}, ${profile.country}`,
      mobilePhone: profile.phoneNumber,
      birthDate: profile.dateOfBirth.split("T")[0],
      nationality: profile.nationality,
      address: "",
      portfolioUrl: profile.portfolioUrl,
      linkedinUrl: profile.linkedInUrl,
    };
  }, [profile]);

  const attachments = useMemo(() => {
    if (!profile?.resumeUrl) return [];
    return [
      {
        id: profile.id,
        name: "Resume",
        type: "PDF",
        url: profile.resumeUrl,
      },
    ];
  }, [profile]);

  const workHistory = useMemo(() => {
    return (
      profile?.experiences.map((exp) => {
        const start = exp.startDate.split("T")[0];
        const period = exp.isCurrentRole ? `${start} - Present` : start;
        return {
          id: exp.id,
          title: exp.title,
          companyOrSchool: exp.company,
          period,
          location: `${exp.city}, ${exp.country}`,
          description: exp.responsibilities,
        };
      }) ?? []
    );
  }, [profile]);

  const educationHistory = useMemo(() => {
    return (
      profile?.educations.map((edu) => {
        const start = edu.startDate.split("T")[0];
        const end = edu.endDate?.split("T")[0];
        return {
          id: edu.id,
          title: edu.degree,
          companyOrSchool: edu.institution,
          period: `${start}${end ? ` - ${end}` : ""}`,
          location: edu.fieldOfStudy,
          description: edu.grade ? `Grade: ${edu.grade}` : "",
        };
      }) ?? []
    );
  }, [profile]);

  const toggleAlert = (id: number) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
      )
    );
  };

  const deleteAlert = (id: number) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };
  return (
    <div className="min-h-[83vh]">
      {/* Header */}
      <div className="bg-white h-24">
        <div className="mx-auto max-w-7xl flex justify-start items-center py-4 gap-2">
          <Image src={imagrr} alt="" className="w-15 h-15 rounded-full" />
          <div className="flex flex-col">
            <h3 className="text-sm font-normal text-primary-1">My profile</h3>
            <h3 className="text-2xl font-bold text-primary-1">
              Mouayad Hawari
            </h3>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-[#E5E5E3] h-8">
        <div className="mx-auto max-w-7xl flex justify-start items-center py-1">
          <h3 className="text-sm text-primary-900">
            Home /{" "}
            <span className="text-primary-1 font-semibold">My profile</span>
          </h3>
        </div>
      </div>

      {/* Tabs */}
      <div className=" mx-auto max-w-7xl py-2">
        <div className="-mb-px border-b border-gray-200">
          <div className="flex gap-8">
            {/* TAB 1 */}
            <button
              onClick={() => setActiveTab("general")}
              className={`py-2 text-sm font-medium transition-colors border-b-2 ${
                activeTab === "general"
                  ? "border-[#054E72] text-primary-1"
                  : "border-transparent text-[#5F5F5C]"
              }`}
            >
              General Information
            </button>

            {/* TAB 2 */}
            <button
              onClick={() => setActiveTab("applications")}
              className={`py-2 text-sm font-medium transition-colors border-b-2 ${
                activeTab === "applications"
                  ? "border-[#054E72] text-primary-1"
                  : "border-transparent text-[#5F5F5C]"
              }`}
            >
              Job applications
            </button>

            {/* TAB 3 */}
            <button
              onClick={() => setActiveTab("alerts")}
              className={`py-2 text-sm font-medium transition-colors border-b-2 ${
                activeTab === "alerts"
                  ? "border-[#054E72] text-primary-1"
                  : "border-transparent text-[#5F5F5C]"
              }`}
            >
              Job alerts
            </button>

            {/* TAB 4 */}
            <button
              onClick={() => setActiveTab("saved")}
              className={`py-2 text-sm font-medium transition-colors border-b-2 ${
                activeTab === "saved"
                  ? "border-[#054E72] text-primary-1"
                  : "border-transparent text-[#5F5F5C]"
              }`}
            >
              Saved jobs
            </button>
          </div>
        </div>

        {/* TAB CONTENT */}
        <div className="mt-4 text-gray-700">
          {activeTab === "general" && (
            <div className="space-y-4 py-2">
              {isLoading && <CandidateProfileSkeleton />}
              {!isLoading && error && (
                <p className="text-red-500 text-sm">Failed to load profile.</p>
              )}
              {!isLoading && !error && profile && (
                <CandidateProfile
                  contactInfo={contactInfo}
                  attachments={attachments}
                  workHistory={workHistory}
                  educationHistory={educationHistory}
                />
              )}
            </div>
          )}

          {activeTab === "applications" && (
            <div className="space-y-4 py-4">
              <JobApplicationsTable />
            </div>
          )}

          {activeTab === "alerts" && (
            <div className="flex justify-between py-4">
              <div className="flex flex-col gap-4 ">
                {alerts.map((alert) => (
                  <JobAlertCard
                    key={alert.id}
                    alert={alert}
                    onToggle={() => toggleAlert(alert.id)}
                    onDelete={() => deleteAlert(alert.id)}
                  />
                ))}
              </div>

              <div>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-md bg-[#00527a] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95 transition"
                >
                  <PlusCircleIcon size={18} weight="bold" />
                  New alert
                </button>
              </div>
            </div>
          )}

          {activeTab === "saved" && (
            <div className="space-y-4 py-4">
              {saveJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileClient;

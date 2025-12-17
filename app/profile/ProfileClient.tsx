"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import profileLogo from "@/public/images/logoProfile.png";
import Image from "next/image";
import { PlusCircleIcon, PencilSimpleIcon } from "@phosphor-icons/react";
import {
  useApplicantProfile,
  useSavedJobs,
  useJobAlerts,
  SavedJobItem,
  JobAlert as JobAlertApi,
  useJobApplications,
  JobApplicationItem,
  useHasProfile,
  useUpdateProfile,
} from "@/hooks";
import CreateProfileForm from "./Components/CreateProfileForm";
import NewJobAlertModal from "./Components/NewJobAlertModal";
import { useAuthStore } from "@/store/useAuthStore";
import {
  formatClosingDate,
  getEmploymentTypeLabel,
  getLevelLabel,
  getTimeAgo,
  getApplicationStatusLabel,
  getWorkArrangementLabel,
} from "@/utils";
import GeneralTab from "./Components/GeneralTab";
import AlertsTab from "./Components/AlertsTab";
import SavedJobsTab from "./Components/SavedJobsTab";
import ApplicationsTab from "./Components/ApplicationsTab";
import { useSearchParams } from "next/navigation";

type JobAlert = {
  id: number;
  title: string;
  keywords: string;
  workingTime: string;
  jobLevel: string;
  location: string;
  jobCategoryName: string;
  workArrangementType: string;
  employmentType: string;
  alertFrequency: string;
  isActive: boolean;
};

const initialAlerts: JobAlert[] = [];
const ProfileClient = () => {
  const { token } = useAuthStore();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "general";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [tabLoading, setTabLoading] = useState(false);
  const [showNewAlertModal, setShowNewAlertModal] = useState(false);

  const [alerts, setAlerts] = useState<JobAlert[]>(initialAlerts);

  // Check if user has a profile
  // API returns result: 2 (or other number) if profile exists, 0 or falsy if not
  const { data: hasProfileData, isLoading: hasProfileLoading } = useHasProfile(
    !!token
  );
  const hasProfile = !!hasProfileData?.result;

  // Only fetch profile and related data if user has a profile
  const { data, isLoading, error } = useApplicantProfile(!!token && hasProfile);
  const {
    data: savedJobsData,
    isLoading: savedLoading,
    error: savedError,
  } = useSavedJobs(!!token && hasProfile);
  const {
    data: alertsData,
    isLoading: alertsLoading,
    error: alertsError,
  } = useJobAlerts({ languageCode: "en" }, !!token && hasProfile);
  const {
    data: applicationsData,
    isLoading: appsLoading,
    error: appsError,
  } = useJobApplications(!!token && hasProfile);

  useEffect(() => {
    if (alertsData?.result) {
      const mapped = alertsData.result.map((alert: JobAlertApi) => ({
        id: alert.id,
        title: alert.positionTitle || "Job Alert",
        keywords: alert.positionTitle || "N/A",
        workingTime: getEmploymentTypeLabel(alert.employmentType),
        jobLevel: getLevelLabel(alert.jobLevel),
        location: "—",
        jobCategoryName: alert.jobCategoryName || "N/A",
        workArrangementType: getWorkArrangementLabel(alert.workArrangementType),
        employmentType: getEmploymentTypeLabel(alert.employmentType),
        alertFrequency: "N/A",
        isActive: true,
      }));
      setAlerts(mapped);
    }
  }, [alertsData]);

  useEffect(() => {
    setTabLoading(true);
    const t = setTimeout(() => setTabLoading(false), 320);
    return () => clearTimeout(t);
  }, [activeTab]);

  const profile = data?.result;

  // Avatar upload
  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const { mutateAsync: updateProfilePicture, isLoading: uploadingAvatar } =
    useUpdateProfile();

  const handleAvatarClick = () => {
    avatarInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("profilePictureFile", file);

    try {
      await updateProfilePicture(fd);
    } catch (err) {
      console.error("Failed to update profile picture", err);
    } finally {
      // clear value so same file can be selected again if needed
      if (avatarInputRef.current) {
        avatarInputRef.current.value = "";
      }
    }
  };

  const savedJobs = useMemo(() => {
    const items = savedJobsData?.result?.items ?? [];
    return items.map((item: SavedJobItem) => {
      const job = item.jobOffer;
      return {
        id: job.id,
        title: job.positionTitle,
        team: job.teamName,
        experienceLevel: getLevelLabel(job.level),
        location: `${job.city}, ${job.country}`,
        postedAgo: getTimeAgo(job.availableDate),
        closingDate: formatClosingDate(job.expirationDate),
        employmentType: getEmploymentTypeLabel(job.employmentType),
        dep: job.teamName,
        level: getLevelLabel(job.level),
      };
    });
  }, [savedJobsData]);

  const applications = useMemo(() => {
    const items = applicationsData?.result ?? [];
    return items.map((item: JobApplicationItem) => ({
      id: item.id,
      jobOfferCode: item.jobOfferCode,
      position: item.jobPosition,
      status: getApplicationStatusLabel(item.status),
      location: item.userProfile.city || "—",
      team: item.teamName,
      applicationDate: item.appliedOn?.split("T")[0] ?? "",
    }));
  }, [applicationsData]);

  const toggleAlert = (id: number) => {
    setAlerts((prev: JobAlert[]) =>
      prev.map((alert: JobAlert) =>
        alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
      )
    );
  };

  const deleteAlert = (id: number) => {
    setAlerts((prev: JobAlert[]) =>
      prev.filter((alert: JobAlert) => alert.id !== id)
    );
  };

  // Show loading state while checking if profile exists
  if (hasProfileLoading) {
    return (
      <div className="min-h-[83vh] flex items-center justify-center">
        <div className="text-primary-900">Loading...</div>
      </div>
    );
  }

  // Show create profile form if user doesn't have a profile
  if (!hasProfile) {
    return <CreateProfileForm />;
  }

  return (
    <div className="min-h-[83vh]">
      {/* Header */}
      <div className="bg-white h-24">
        <div className="mx-auto max-w-7xl flex justify-start items-center py-4 gap-2">
          <div className="relative inline-block">
            <Image
              src={(profile as any)?.profilePictureUrl || profileLogo}
              alt="Profile picture"
              width={60}
              height={60}
              className="rounded-full object-cover"
            />
            <button
              type="button"
              onClick={handleAvatarClick}
              disabled={uploadingAvatar}
              className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#5F5F5C] text-white shadow-sm hover:opacity-90 disabled:opacity-60"
            >
              <PencilSimpleIcon size={14} weight="fill" />
            </button>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm font-normal text-primary-1">My profile</h3>
            <h3 className="text-2xl font-bold text-primary-1">
              {profile?.firstName} {profile?.lastName}
            </h3>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-[#E5E5E3] h-8">
        <div className="mx-auto max-w-7xl flex justify-start items-center py-1 px-2">
          <h3 className="text-sm text-primary-900">
            Home /{" "}
            <span className="text-primary-1 font-semibold">My profile</span>
          </h3>
        </div>
      </div>

      {/* Tabs */}
      <div className=" mx-auto max-w-7xl py-2 px-2">
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
            <div className="space-y-4 py-2 px-2">
              <GeneralTab
                profile={profile}
                loading={isLoading}
                error={!!error}
                showSkeleton={tabLoading}
              />
            </div>
          )}

          {activeTab === "applications" && (
            <div className="space-y-4 py-4 px-2">
              <ApplicationsTab
                applications={applications}
                loading={appsLoading}
                error={!!appsError}
                showSkeleton={tabLoading}
              />
            </div>
          )}

          {activeTab === "alerts" && (
            <div className="flex justify-between py-4 px-2">
              <div className="flex flex-col gap-4 ">
                <AlertsTab
                  alerts={alerts}
                  loading={alertsLoading}
                  error={!!alertsError}
                  showSkeleton={tabLoading}
                  onToggle={toggleAlert}
                  onDelete={deleteAlert}
                />
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => setShowNewAlertModal(true)}
                  className="inline-flex items-center gap-2 rounded-md bg-[#00527a] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-95 transition"
                >
                  <PlusCircleIcon size={22} weight="bold" />
                  New alert
                </button>
              </div>
            </div>
          )}

          {activeTab === "saved" && (
            <div className="space-y-4 py-4 px-2">
              <SavedJobsTab
                jobs={savedJobs}
                loading={savedLoading}
                error={!!savedError}
                showSkeleton={tabLoading}
              />
            </div>
          )}
        </div>
      </div>

      <NewJobAlertModal
        open={showNewAlertModal}
        onClose={() => setShowNewAlertModal(false)}
      />
    </div>
  );
};

export default ProfileClient;

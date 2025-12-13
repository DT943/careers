import {
  JobLevel,
  WorkArrangementType,
  EmploymentType,
  ApplicationStatus,
  LanguageLevel,
} from "@/enums";

export const getTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30)
    return `${Math.floor(diffDays / 7)} week${
      Math.floor(diffDays / 7) > 1 ? "s" : ""
    } ago`;
  return `${Math.floor(diffDays / 30)} month${
    Math.floor(diffDays / 30) > 1 ? "s" : ""
  } ago`;
};

export const formatClosingDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-");
};

export const getEmploymentTypeLabel = (type: number): string => {
  const labels: Record<EmploymentType, string> = {
    [EmploymentType.FullTime]: "Full time",
    [EmploymentType.PartTime]: "Part time",
    [EmploymentType.Contract]: "Contract",
    [EmploymentType.Temporary]: "Temporary",
  };
  return labels[type as EmploymentType] || "Unknown";
};

export const getLevelLabel = (level: number): string => {
  const labels: Record<JobLevel, string> = {
    [JobLevel.Intern]: "Intern",
    [JobLevel.Junior]: "Junior",
    [JobLevel.Mid]: "Mid-level",
    [JobLevel.Senior]: "Senior",
    [JobLevel.Lead]: "Lead",
    [JobLevel.Principal]: "Principal",
  };
  return labels[level as JobLevel] || "Unknown";
};

export const getWorkArrangementLabel = (arrangement: number): string => {
  const labels: Record<WorkArrangementType, string> = {
    [WorkArrangementType.Onsite]: "Onsite",
    [WorkArrangementType.Remote]: "Remote",
    [WorkArrangementType.Hybrid]: "Hybrid",
  };
  return labels[arrangement as WorkArrangementType] || "Unknown";
};

export const getApplicationStatusLabel = (status: number): string => {
  const labels: Record<ApplicationStatus, string> = {
    [ApplicationStatus.Pending]: "Pending",
    [ApplicationStatus.Reviewed]: "Reviewed",
    [ApplicationStatus.Scheduled]: "Scheduled",
    [ApplicationStatus.Interviewed]: "Interviewed",
    [ApplicationStatus.OfferExtended]: "Offer Extended",
    [ApplicationStatus.OfferAccepted]: "Offer Accepted",
    [ApplicationStatus.Hired]: "Hired",
    [ApplicationStatus.Rejected]: "Rejected",
    [ApplicationStatus.Withdrawn]: "Withdrawn",
  };
  return labels[status as ApplicationStatus] || "Unknown";
};

export const getLanguageLevelLabel = (level: number): string => {
  const labels: Record<LanguageLevel, string> = {
    [LanguageLevel.Beginner]: "Beginner",
    [LanguageLevel.Intermediate]: "Intermediate",
    [LanguageLevel.Fluent]: "Fluent",
    [LanguageLevel.Native]: "Native",
  };
  return labels[level as LanguageLevel] || "Unknown";
};

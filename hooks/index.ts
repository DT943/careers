// Core API hooks
export {
  useGetQuery,
  usePostMutation,
  useUpdateMutation,
  usePatchMutation,
  useDeleteMutation,
  queryKeys,
} from "./useApi";

// Job Offers Hooks
export {
  useJobOffers,
  useCreateJobOffer,
  useUpdateJobOffer,
  useDeleteJobOffer,
} from "./useJobOffers";
export { useTeams } from "./useTeams";
export { useJobOfferDetail } from "./useJobOfferDetail";
export { useApplicantProfile } from "./useProfile";
export { useSavedJobs } from "./useSavedJobs";
export { useJobAlerts } from "./useJobAlerts";
export { useJobApplications } from "./useJobApplications";
export { useParseResume, useApplyToJob } from "./useJobApplication";

export type {
  JobOffer,
  JobOfferParams,
  CreateJobOfferData,
  UpdateJobOfferData,
} from "./useJobOffers";
export type { Team } from "./useTeams";
export type { JobOfferDetail } from "./useJobOfferDetail";
export type {
  ApplicantProfile,
  ProfileSkill,
  ProfileEducation,
  ProfileExperience,
  ProfileLanguage,
} from "./useProfile";
export type { SavedJobItem, SavedJobsResponse } from "./useSavedJobs";
export type { JobAlert } from "./useJobAlerts";
export type { JobApplicationItem } from "./useJobApplications";


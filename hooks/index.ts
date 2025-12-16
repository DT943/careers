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
export { useApplicantTeams } from "./useApplicantTeams";
export { useJobOfferDetail } from "./useJobOfferDetail";
export { useApplicantProfile, useUpdateProfile, useCreateProfile } from "./useProfile";
export { useHasProfile } from "./useHasProfile";
export { useSavedJobs } from "./useSavedJobs";
export { useSaveJobOffer, useUnsaveJobOffer } from "./useSavedJobActions";
export { useJobAlerts, useCreateJobAlert } from "./useJobAlerts";
export { useJobApplications } from "./useJobApplications";
export { useParseResume, useApplyToJob } from "./useJobApplication";
export { usePositionTitles } from "./usePositionTitles";

export type {
  JobOffer,
  JobOfferParams,
  CreateJobOfferData,
  UpdateJobOfferData,
} from "./useJobOffers";
export type { Team } from "./useTeams";
export type {
  ApplicantTeam,
  ApplicantTeamsResponse,
  ApplicantTeamTranslation,
} from "./useApplicantTeams";
export type { JobOfferDetail } from "./useJobOfferDetail";
export type {
  ApplicantProfile,
  ProfileSkill,
  ProfileEducation,
  ProfileExperience,
  ProfileLanguage,
} from "./useProfile";
export type { SavedJobItem, SavedJobsResponse } from "./useSavedJobs";
export type { JobAlert, CreateJobAlertData } from "./useJobAlerts";
export type { PositionTitle, PositionTitlesResponse } from "./usePositionTitles";
export type { JobApplicationItem } from "./useJobApplications";


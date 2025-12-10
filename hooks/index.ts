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
  getLevelLabel,
} from "./useJobOffers";

export type {
  JobOffer,
  JobOfferParams,
  CreateJobOfferData,
  UpdateJobOfferData,
} from "./useJobOffers";


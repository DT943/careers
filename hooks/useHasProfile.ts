import { useGetQuery, queryKeys } from "./useApi";
import { ApiResponse } from "./useApi";

const ENDPOINT = "/career/applicant/has-profile";

export const useHasProfile = (enabled = true) => {
  return useGetQuery<ApiResponse<number>>(
    queryKeys.auth.hasProfile,
    ENDPOINT,
    undefined,
    { enabled }
  );
};

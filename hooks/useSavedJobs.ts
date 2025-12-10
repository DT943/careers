import { useGetQuery, queryKeys, ApiResponse } from "./useApi";

export interface SavedJobItem {
  id: number;
  code: string;
  profileId: number;
  jobOfferId: number;
  jobOffer: {
    id: number;
    code: string;
    positionTitle: string;
    level: number;
    employmentType: number;
    workArrangement: number;
    city: string;
    country: string;
    availableDate: string;
    expirationDate: string;
    teamName: string;
    teamTag: string;
    teamImageUrl: string;
  };
  createdDate: string;
  modifiedDate: string;
}

export interface SavedJobsResponse {
  items: SavedJobItem[];
  totalCount: number;
  page: number;
  pageSize: number;
}

const ENDPOINTS = {
  list: "/career/SavedJob/my-saved-jobs",
};

export const useSavedJobs = (enabled = true) => {
  return useGetQuery<ApiResponse<SavedJobsResponse>>(
    queryKeys.auth.savedJobs,
    ENDPOINTS.list,
    undefined,
    { enabled }
  );
};


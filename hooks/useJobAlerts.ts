import { useGetQuery, queryKeys, ApiResponse, QueryParams } from "./useApi";

export interface JobAlert {
  id: number;
  code: string;
  profileId: number;
  positionTitleId: number;
  positionTitle: string;
  jobLevel: number;
  employmentType: number;
  workArrangementType: number;
  jobCategory: number;
  createdDate: string;
  createdBy: string;
  modifiedDate: string;
}

const ENDPOINTS = {
  list: "/career/applicant/job-alerts",
};

export const useJobAlerts = (params?: QueryParams, enabled = true) => {
  return useGetQuery<ApiResponse<JobAlert[]>>(
    queryKeys.auth.jobAlerts,
    ENDPOINTS.list,
    params,
    { enabled }
  );
};


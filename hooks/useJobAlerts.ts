import { useGetQuery, queryKeys, ApiResponse, QueryParams, usePostMutation } from "./useApi";

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
  jobCategoryName: string;
  createdDate: string;
  createdBy: string;
  modifiedDate: string;
}

export interface CreateJobAlertData {
  jobLevel: number;
  employmentType: number;
  workArrangementType: number;
  positionTitleId: number;
  jobCategory: number;
}

const ENDPOINTS = {
  list: "/career/applicant/job-alerts",
  create: "/career/applicant/job-alerts",
};

export const useJobAlerts = (params?: QueryParams, enabled = true) => {
  return useGetQuery<ApiResponse<JobAlert[]>>(
    queryKeys.auth.jobAlerts,
    ENDPOINTS.list,
    params,
    { enabled }
  );
};

export const useCreateJobAlert = () => {
  return usePostMutation<ApiResponse<JobAlert>, CreateJobAlertData>(
    ENDPOINTS.create,
    {
      onError: (error) => {
        console.error("Failed to create job alert:", error.message);
      },
    },
    [queryKeys.auth.jobAlerts]
  );
};


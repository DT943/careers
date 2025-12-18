import { ApplicantProfile } from ".";
import { useGetQuery, queryKeys, ApiResponse } from "./useApi";
import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "@/constant";

export interface JobApplicationItem {
  jobOfferId: number;
  jobOfferCode: string;
  jobPosition: string;
  teamId: number;
  teamName: string;
  city: string;
  country: string;
  status: number;
  appliedOn: string;
}

const ENDPOINTS = {
  list: "/career/applicant/applications",
  base: "/career/applicant",
};

export const useJobApplications = (enabled = true) => {
  return useGetQuery<ApiResponse<JobApplicationItem[]>>(
    queryKeys.auth.applications,
    ENDPOINTS.list,
    undefined,
    { enabled }
  );
};

interface WithdrawApplicationPayload {
  jobApplicationId: number;
  note: string;
}

export const useWithdrawApplication = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, Error, WithdrawApplicationPayload>(
    async ({ jobApplicationId, note }) => {
      const { data } = await axiosInstance.post<ApiResponse<null>>(
        `${ENDPOINTS.base}/withdraw/${jobApplicationId}`,
        { note }
      );
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.auth.applications as any);
      },
      onError: (error) => {
        console.error("Failed to withdraw application:", error);
      },
    }
  );
};

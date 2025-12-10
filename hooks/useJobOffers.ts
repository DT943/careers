import { useGetQuery, usePostMutation, useUpdateMutation, useDeleteMutation, queryKeys, ApiResponse, QueryParams } from "@/hooks/useApi";
import { formatClosingDate, getEmploymentTypeLabel, getTimeAgo } from "@/utils";

// ============================================
// Types
// ============================================

export interface JobOffer {
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
}

export interface JobOfferParams extends QueryParams {
  search?: string;
  city?: string;
}

export interface CreateJobOfferData {
  positionTitle: string;
  level: number;
  employmentType: number;
  workArrangement: number;
  city: string;
  country: string;
  availableDate: string;
  expirationDate: string;
  teamName: string;
}

export interface UpdateJobOfferData extends Partial<CreateJobOfferData> {
  id: number;
}

// ============================================
// API Endpoints
// ============================================

const ENDPOINTS = {
  list: "/career/JobOffer/public",
  create: "/career/JobOffer",
  update: "/career/JobOffer/:id",
  delete: "/career/JobOffer/:id",
};

// ============================================
// Hooks
// ============================================

/**
 * Hook to fetch job offers list
 * @param params - Optional search and city filters
 * @param enabled - Whether to enable the query
 */
export const useJobOffers = (params?: JobOfferParams, enabled = true) => {
  return useGetQuery<ApiResponse<JobOffer[]>>(
    queryKeys.careers.jobOffers(params ?? {}),
    ENDPOINTS.list,
    params,
    { enabled }
  );
};

/**
 * Hook to create a new job offer
 */
export const useCreateJobOffer = () => {
  return usePostMutation<ApiResponse<JobOffer>, CreateJobOfferData>(
    ENDPOINTS.create,
    {
      onError: (error) => {
        console.error("Failed to create job offer:", error.message);
      },
    },
    ["careers"] // Invalidate careers queries on success
  );
};

/**
 * Hook to update a job offer
 */
export const useUpdateJobOffer = () => {
  return useUpdateMutation<ApiResponse<JobOffer>, UpdateJobOfferData>(
    ENDPOINTS.update,
    {
      onError: (error) => {
        console.error("Failed to update job offer:", error.message);
      },
    },
    ["careers"]
  );
};

/**
 * Hook to delete a job offer
 */
export const useDeleteJobOffer = () => {
  return useDeleteMutation<ApiResponse<null>>(
    ENDPOINTS.delete,
    {
      onError: (error) => {
        console.error("Failed to delete job offer:", error.message);
      },
    },
    ["careers"]
  );
};


export { getEmploymentTypeLabel, getTimeAgo, formatClosingDate };


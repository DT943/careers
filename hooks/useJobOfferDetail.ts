import { useGetQuery, queryKeys, ApiResponse, QueryParams } from "./useApi";

export interface JobOfferDetail {
  id: number;
  code: string;
  availableDate: string;
  expirationDate: string;
  level: number;
  workArrangement: number;
  employmentType: number;
  status: number;
  approvalStatus: string;
  teamId: number;
  teamName: string;
  teamTag: string;
  teamImageUrl: string;
  positionTitleId: number;
  positionTitle: string;
  jobOfferTranslations: {
    id: number;
    languageCode: string;
    country: string;
    city: string;
    about: string;
  }[];
  keyResponsibilityTranslations: { id: number; languageCode: string; title: string }[];
  requirementTranslations: { id: number; languageCode: string; title: string }[];
  perkTranslations: { id: number; languageCode: string; title: string }[];
  actionStats: unknown[];
  createdDate: string;
  createdBy: string;
  modifiedDate: string;
  modifiedBy: string;
}

const ENDPOINTS = {
  detail: (id: string | number) => `/career/JobOffer/public/${id}`,
};

export const useJobOfferDetail = (
  id?: string | number,
  params?: QueryParams,
  enabled = true
) => {
  return useGetQuery<ApiResponse<JobOfferDetail>>(
    queryKeys.jobs.detail(id ?? "unknown"),
    ENDPOINTS.detail(id ?? ""),
    params,
    { enabled: enabled && !!id }
  );
};


import { useGetQuery, queryKeys, ApiResponse, QueryParams } from "./useApi";

export interface PositionTitle {
  id: number;
  code: string;
  positionTitleTranslations: Array<{
    id: number;
    languageCode: string;
    title: string;
  }>;
  createdDate: string;
  createdBy: string;
  modifiedDate: string;
}

export interface PositionTitlesResponse {
  items: PositionTitle[];
  totalCount: number;
  page: number;
  pageSize: number;
}

const ENDPOINTS = {
  list: "/career/applicant/position-titles",
};

export const usePositionTitles = (params?: QueryParams, enabled = true) => {
  return useGetQuery<ApiResponse<PositionTitlesResponse>>(
    ["position-titles", params ?? {}],
    ENDPOINTS.list,
    params,
    { enabled }
  );
};


import { useGetQuery, queryKeys, ApiResponse, QueryParams } from "./useApi";

export interface TeamTranslation {
  id: number;
  languageCode: string;
  name: string;
  description: string;
  tag: string;
}

export interface Team {
  id: number;
  code: string;
  imageUrl: string;
  teamTranslations: TeamTranslation[];
  createdDate: string;
  modifiedDate: string;
  jobOffersCount: number;
}

export interface TeamsResponse {
  items: Team[];
  totalCount: number;
  page: number;
  pageSize: number;
}

const ENDPOINTS = {
  list: "/career/applicant/teams",
};

export const useTeams = (params?: QueryParams, enabled = true) => {
  return useGetQuery<ApiResponse<TeamsResponse>>(
    ["teams", params ?? {}],
    ENDPOINTS.list,
    params,
    { enabled }
  );
};

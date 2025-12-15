import { useGetQuery, ApiResponse, QueryParams } from "./useApi";

export interface ApplicantTeamTranslation {
  id: number;
  languageCode: string;
  name: string;
  description: string;
  tag: string;
}

export interface ApplicantTeam {
  id: number;
  code: string;
  imageUrl: string;
  teamTranslations: ApplicantTeamTranslation[];
  createdDate: string;
  modifiedDate: string;
  jobOffersCount: number;
}

export interface ApplicantTeamsResponse {
  items: ApplicantTeam[];
  totalCount: number;
  page: number;
  pageSize: number;
}

const ENDPOINTS = {
  list: "/career/applicant/teams",
};

export const useApplicantTeams = (
  params?: QueryParams,
  enabled = true
) => {
  return useGetQuery<ApiResponse<ApplicantTeamsResponse>>(
    ["applicant-teams", params ?? {}],
    ENDPOINTS.list,
    params,
    { enabled }
  );
};


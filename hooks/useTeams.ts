import { useGetQuery, queryKeys, ApiResponse, QueryParams } from "./useApi";

export interface Team {
  id: number;
  name: string;
  description: string;
  tag: string;
  imageUrl: string;
  openJobOffersCount: number;
}

const ENDPOINTS = {
  list: "/career/Team/public",
};

export const useTeams = (params?: QueryParams, enabled = true) => {
  return useGetQuery<ApiResponse<Team[]>>(
    queryKeys.careers.teams.list(params ?? {}),
    ENDPOINTS.list,
    params,
    { enabled }
  );
};


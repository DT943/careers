import { useQuery } from "react-query";
import { AxiosError } from "axios";
import axiosInstance from "@/constant";
import { queryKeys, ApiResponse, ApiError } from "./useApi";

const ENDPOINT = "/career/applicant/has-profile";

// This hook treats 404 as "no profile yet" and does NOT surface an error to the UI.
export const useHasProfile = (enabled = true) => {
  return useQuery<ApiResponse<number>, AxiosError<ApiError>>(
    queryKeys.auth.hasProfile as any,
    async () => {
      try {
        const response = await axiosInstance.get<ApiResponse<number>>(ENDPOINT);
        return response.data;
      } catch (error: any) {
        const status = error?.response?.status;
        // 404 from this endpoint means the user doesn't have a profile yet.
        if (status === 404) {
          return {
            isSuccess: false,
            result: 0,
            statusCode: 404,
          };
        }
        throw error;
      }
    },
    {
      enabled,
      retry: false,
    }
  );
};

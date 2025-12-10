"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from "react-query";
import { AxiosError } from "axios";

import {
  ApiError,
  ApiResponse,
  QueryParams,
  deleteData,
  getData,
  patchData,
  postData,
  updateData,
} from "@/services/Api";

// ============================================
// Reusable React Query Hooks
// ============================================

export const useGetQuery = <T,>(
  queryKey: string | readonly (string | number | QueryParams | Record<string, never>)[],
  url: string,
  params?: QueryParams,
  options?: Omit<UseQueryOptions<T, AxiosError<ApiError>>, "queryKey" | "queryFn">
) => {
  return useQuery<T, AxiosError<ApiError>>(
    queryKey as any,
    () => getData<T>(url, params),
    {
      ...options,
    }
  );
};

export const usePostMutation = <T, D = object>(
  url: string,
  options?: Omit<UseMutationOptions<T, AxiosError<ApiError>, D>, "mutationFn">,
  invalidateKeys?: (string | readonly unknown[])[]
) => {
  const queryClient = useQueryClient();

  return useMutation<T, AxiosError<ApiError>, D>(
    (data: D) => postData<T, D>(url, data),
    {
      ...options,
      onSuccess: (data, variables, context) => {
        invalidateKeys?.forEach((key) => {
          queryClient.invalidateQueries(key as any);
        });
        options?.onSuccess?.(data, variables, context);
      },
    }
  );
};

export const useUpdateMutation = <T, D extends { id?: string | number } = object>(
  url: string,
  options?: Omit<UseMutationOptions<T, AxiosError<ApiError>, D>, "mutationFn">,
  invalidateKeys?: (string | readonly unknown[])[]
) => {
  const queryClient = useQueryClient();

  return useMutation<T, AxiosError<ApiError>, D>(
    (data: D) => {
      const finalUrl = data.id ? url.replace(":id", String(data.id)) : url;
      return updateData<T, D>(finalUrl, data);
    },
    {
      ...options,
      onSuccess: (data, variables, context) => {
        invalidateKeys?.forEach((key) => {
          queryClient.invalidateQueries(key as any);
        });
        options?.onSuccess?.(data, variables, context);
      },
    }
  );
};

export const usePatchMutation = <T, D extends { id?: string | number } = object>(
  url: string,
  options?: Omit<UseMutationOptions<T, AxiosError<ApiError>, D>, "mutationFn">,
  invalidateKeys?: (string | readonly unknown[])[]
) => {
  const queryClient = useQueryClient();

  return useMutation<T, AxiosError<ApiError>, D>(
    (data: D) => {
      const finalUrl = data.id ? url.replace(":id", String(data.id)) : url;
      return patchData<T, D>(finalUrl, data);
    },
    {
      ...options,
      onSuccess: (data, variables, context) => {
        invalidateKeys?.forEach((key) => {
          queryClient.invalidateQueries(key as any);
        });
        options?.onSuccess?.(data, variables, context);
      },
    }
  );
};

export const useDeleteMutation = <T,>(
  url: string,
  options?: Omit<UseMutationOptions<T, AxiosError<ApiError>, string | number>, "mutationFn">,
  invalidateKeys?: (string | readonly unknown[])[]
) => {
  const queryClient = useQueryClient();

  return useMutation<T, AxiosError<ApiError>, string | number>(
    (id: string | number) => deleteData<T>(url.replace(":id", String(id))),
    {
      ...options,
      onSuccess: (data, variables, context) => {
        invalidateKeys?.forEach((key) => {
          queryClient.invalidateQueries(key as any);
        });
        options?.onSuccess?.(data, variables, context);
      },
    }
  );
};

// ============================================
// Query Keys Factory
// ============================================

export const queryKeys = {
  jobs: {
    all: ["jobs"] as const,
    list: (params?: QueryParams) => ["jobs", "list", params ?? {}] as const,
    detail: (id: string | number) => ["jobs", "detail", id] as const,
  },
  careers: {
    all: ["careers"] as const,
    jobOffers: (params?: QueryParams) => ["careers", "jobOffers", params ?? {}] as const,
    teams: {
      list: (params?: QueryParams) => ["careers", "teams", params ?? {}] as const,
    },
  },
  auth: {
    user: ["auth", "user"] as const,
    profile: ["auth", "profile"] as const,
    savedJobs: ["auth", "savedJobs"] as const,
    jobAlerts: ["auth", "jobAlerts"] as const,
    applications: ["auth", "applications"] as const,
  },
};

export type { ApiResponse, ApiError, QueryParams } from "@/services/Api";


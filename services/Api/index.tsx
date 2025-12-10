import axiosInstance from "@/constant";

// ============================================
// Types
// ============================================

export interface ApiResponse<T> {
  isSuccess: boolean;
  result: T;
  statusCode: number;
  message?: string;
}

export interface ApiError {
  message: string;
  statusCode?: number;
}

export interface QueryParams {
  [key: string]: string | number | boolean | undefined;
}

// ============================================
// Base API Functions
// ============================================

export const getData = async <T,>(url: string, params?: QueryParams): Promise<T> => {
  const queryString = params
    ? `?${new URLSearchParams(
        Object.entries(params)
          .filter(([, v]) => v !== undefined && v !== "")
          .map(([k, v]) => [k, String(v)])
      ).toString()}`
    : "";

  const response = await axiosInstance.get<T>(`${url}${queryString}`);
  return response.data;
};

export const postData = async <T, D = object>(url: string, data?: D): Promise<T> => {
  const response = await axiosInstance.post<T>(url, data);
  return response.data;
};

export const updateData = async <T, D = object>(url: string, data?: D): Promise<T> => {
  const response = await axiosInstance.put<T>(url, data);
  return response.data;
};

export const patchData = async <T, D = object>(url: string, data?: D): Promise<T> => {
  const response = await axiosInstance.patch<T>(url, data);
  return response.data;
};

export const deleteData = async <T,>(url: string): Promise<T> => {
  const response = await axiosInstance.delete<T>(url);
  return response.data;
};

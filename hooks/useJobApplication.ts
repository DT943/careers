import { useMutation } from "react-query";
import axiosInstance from "@/constant";
import { ApiResponse } from "./useApi";

type ParseResumeResult = {
  resumeCode: string;
  resumeUrl: string;
  skills?: string[];
  experiences?: Array<{
    title: string;
    company: string;
    description?: string;
    startDate: string;
    endDate?: string;
  }>;
  educations?: Array<{
    degree: string;
    institution: string;
    startDate: string;
    endDate?: string;
  }>;
};

export const useParseResume = () =>
  useMutation(async (file: File) => {
    const formData = new FormData();
    formData.append("ResumeFile", file);
    const { data } = await axiosInstance.post<ApiResponse<ParseResumeResult>>(
      "/career/applicant/resume/parse",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return data.result;
  });

export const useApplyToJob = () =>
  useMutation(async (payload: Record<string, any>) => {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      if (Array.isArray(value)) {
        value.forEach((v, idx) => {
          if (typeof v === "object" && v !== null) {
            Object.entries(v).forEach(([k, val]) => {
              if (val !== undefined && val !== null) {
                formData.append(`${key}[${idx}].${k}`, String(val));
              }
            });
          } else {
            formData.append(`${key}[${idx}]`, String(v));
          }
        });
      } else {
        formData.append(key, String(value));
      }
    });

    const { data } = await axiosInstance.post<ApiResponse<null>>(
      "/career/applicant/applyToJob",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return data;
  });


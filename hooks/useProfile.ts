import { useGetQuery, queryKeys, ApiResponse } from "./useApi";
import { useUpdateMutation } from "./useApi";

export interface ProfileSkill {
  id: number;
  name: string;
}

export interface ProfileEducation {
  id: number;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  grade: string;
}

export interface ProfileExperience {
  endDate: any;
  id: number;
  company: string;
  title: string;
  startDate: string;
  isCurrentRole: boolean;
  responsibilities: string;
  city: string;
  country: string;
}

export interface ProfileLanguage {
  id: number;
  name: string;
  level: number;
}

export interface ApplicantProfile {
  id: number;
  code: string;
  userCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  linkedInUrl: string;
  portfolioUrl: string;
  city: string;
  country: string;
  nationality: string;
  dateOfBirth: string;
  resumeUrl: string;
  profilePictureUrl?: string;
  createdAt: string;
  updatedAt: string;
  skills: ProfileSkill[];
  educations: ProfileEducation[];
  experiences: ProfileExperience[];
  languages: ProfileLanguage[];
}

const ENDPOINTS = {
  profile: "/career/applicant/profile",
};

export const useApplicantProfile = (enabled = true) => {
  return useGetQuery<ApiResponse<ApplicantProfile>>(
    queryKeys.auth.profile,
    ENDPOINTS.profile,
    undefined,
    { enabled }
  );
};

// Update profile via PUT form-data. Pass only the fields you need.
export const useUpdateProfile = () =>
  useUpdateMutation<ApiResponse<ApplicantProfile>, any>(
    ENDPOINTS.profile,
    {},
    [queryKeys.auth.profile]
  );

// Create profile via POST form-data
import { usePostMutation } from "./useApi";

export const useCreateProfile = () =>
  usePostMutation<ApiResponse<ApplicantProfile>, FormData>(
    ENDPOINTS.profile,
    {},
    [queryKeys.auth.profile, queryKeys.auth.hasProfile]
  );


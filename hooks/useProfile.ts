import { useGetQuery, queryKeys, ApiResponse } from "./useApi";

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


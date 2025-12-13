import { ApplicantProfile } from ".";
import { useGetQuery, queryKeys, ApiResponse } from "./useApi";

export interface JobApplicationItem {
  id: number;
  code: string;
  jobOfferId: number;
  jobOfferCode: string;
  jobPosition: string;
  jobOfferStatus: number;
  teamId: number;
  teamName: string;
  teamTag: string;
  teamImageUrl: string;
  profileId: number;
  userCode: string;
  status: number;
  hasWorkedAtFlyChamBefore: boolean;
  hasRelativesAtFlyCham: boolean;
  whyWantToJoinFlyCham: string;
  howDidYouHearAboutJob: string;
  yearsOfExperience: number;
  whenCanYouStart: string;
  expectedSalary: string;
  appliedOn: string;
  userProfile: ApplicantProfile
}

const ENDPOINTS = {
  list: "/career/applicant/applications",
};

export const useJobApplications = (enabled = true) => {
  return useGetQuery<ApiResponse<JobApplicationItem[]>>(
    queryKeys.auth.applications,
    ENDPOINTS.list,
    undefined,
    { enabled }
  );
};


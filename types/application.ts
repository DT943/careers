export type PositionItem = {
  companyName: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  currentlyWorkingHere: boolean;
  description: string;
};

export type EducationItem = {
  institutionName: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  currentlyWorkingHere: boolean;
};

export type LanguageItem = {
  name: string;
  level: number;
};

export interface ApplicationData {
  // Resume
  resume: File | null;
  resumeUrl: string;
  resumeCode?: string;
  skills: string[];
  additionalDocuments: File[];
  portfolioUrl: string;

  // Personal info
  firstName: string;
  lastName: string;
  email: string;
  countryPhoneCode: string;
  phoneNumber: string;
  country: string;
  city: string;
  dateOfBirth: string;
  nationality: string;
  linkedinUrl: string;

  // Professional
  positions: PositionItem[];
  educationHistory: EducationItem[];
  languages: LanguageItem[];

  // Additional questions
  hasWorkedBefore?: boolean;
  hasRelatives?: boolean;
  whyJoin: string;
  howHear: string;
  yearsOfExperience: string;
  whenCanYouStart: string;
  expectedSalary: string;

  // Job info
  jobOfferId?: number;
  jobTitle?: string;

  step: number;
}

export interface ApplicationStepProps {
  data: ApplicationData;
  updateData: (data: Partial<ApplicationData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

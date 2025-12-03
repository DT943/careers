export interface ApplicationData {
  resume: File | null;
  resumeUrl: string;
  additionalDocuments: File[];
  portfolioUrl: string;
  step: number;
}

export interface ApplicationStepProps {
  data: ApplicationData;
  updateData: (data: Partial<ApplicationData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

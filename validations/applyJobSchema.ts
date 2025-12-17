import { z } from "zod";

export const applyJobSchema = z.object({
  JobOfferId: z
    .number({
      required_error: "Job information is required.",
      invalid_type_error: "Job information is required.",
    })
    .int()
    .positive("Job information is required."),
  ResumeCode: z
    .string()
    .min(1, "Please select a resume before submitting your application."),
  HasWorkedAtFlyChamBefore: z.boolean({
    required_error: "Please specify if you have worked at FlyCham before.",
    invalid_type_error: "Please specify if you have worked at FlyCham before.",
  }),
  HasRelativesAtFlyCham: z.boolean({
    required_error: "Please specify if you have relatives at FlyCham.",
    invalid_type_error: "Please specify if you have relatives at FlyCham.",
  }),
  WhyWantToJoinFlyCham: z
    .string()
    .min(1, "Please tell us why you want to join FlyCham."),
  HowDidYouHearAboutJob: z
    .string()
    .min(1, "Please tell us how you heard about this job."),
  YearsOfExperience: z
    .string()
    .min(1, "Please enter your years of experience."),
  whenCanYouStart: z
    .string()
    .min(1, "Please select when you can start."),
  ExpectedSalary: z
    .string()
    .min(1, "Please enter your expected salary."),
});

export type ApplyJobPayload = z.infer<typeof applyJobSchema>;



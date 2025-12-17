import { z } from "zod";

// Step 2: Personal information schema
export const createProfileSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(100, "First name must be at most 100 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(100, "Last name must be at most 100 characters"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  countryPhoneCode: z.string().min(1, "Country phone code is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  nationality: z.string().min(1, "Nationality is required"),
  linkedInUrl: z
    .string()
    .url("Please enter a valid LinkedIn URL")
    .or(z.literal("")),
  portfolioUrl: z
    .string()
    .url("Please enter a valid URL")
    .or(z.literal("")),
});

export type CreateProfileFormValues = z.infer<typeof createProfileSchema>;

// Step 3: Professional information schemas
export const workHistoryItemSchema = z
  .object({
    title: z.string().min(1, "Job title is required"),
    company: z.string().min(1, "Company is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional().or(z.literal("")),
    isCurrentRole: z.boolean(),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
    responsibilities: z
      .string()
      .min(1, "Responsibilities are required"),
  })
  .refine(
    (data) => {
      if (data.isCurrentRole) return true;
      return !!data.endDate && data.endDate.trim().length > 0;
    },
    {
      message: "End date is required unless this is your current role",
      path: ["endDate"],
    }
  );

export const educationHistoryItemSchema = z.object({
  institution: z.string().min(1, "Institution is required"),
  degree: z.string().min(1, "Degree is required"),
  fieldOfStudy: z.string().min(1, "Field of study is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  grade: z.string().optional().or(z.literal("")),
});

export const skillSchema = z.object({
  name: z.string().min(1, "Skill is required"),
});

export const languageItemSchema = z.object({
  name: z.string().min(1, "Language is required"),
  level: z.number().nonnegative("Language level is required"),
});

export const professionalInfoSchema = z.object({
  skills: z
    .array(skillSchema)
    .min(1, "At least one skill is required"),
  workHistory: z
    .array(workHistoryItemSchema)
    .min(1, "At least one work history entry is required"),
  educationHistory: z
    .array(educationHistoryItemSchema)
    .min(1, "At least one education entry is required"),
  languages: z
    .array(languageItemSchema)
    .min(1, "At least one language is required"),
});

export type ProfessionalInfoFormValues = z.infer<
  typeof professionalInfoSchema
>;


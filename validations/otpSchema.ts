import { z } from "zod";

export const otpSchema = z.object({
  otp: z
    .string()
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain digits only"),
  client: z.string(),
  // token: z.string(),
});

export type OtpFormValues = z.infer<typeof otpSchema>;

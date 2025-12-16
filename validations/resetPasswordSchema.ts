import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100)
      // at least 1 uppercase letter
      .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
      // at least 1 symbol (special character)
      .regex(/[^A-Za-z0-9]/, "Password must contain at least 1 symbol"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    client: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

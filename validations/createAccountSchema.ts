import { z } from "zod";

export const createAccountSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  client: z.string(),
});

export type CreateAccountFormValues = z.infer<typeof createAccountSchema>;

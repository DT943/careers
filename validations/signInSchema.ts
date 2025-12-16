import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  // password: z.string().min(1, "Password is required"),
  password: z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(100)
  // at least 1 uppercase letter
  .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
  // at least 1 symbol (special character)
  .regex(/[^A-Za-z0-9]/, "Password must contain at least 1 symbol"),
  client: z.string(),
});

export type SignInFormValues = z.infer<typeof signInSchema>;

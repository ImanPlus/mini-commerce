import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be at most 100 characters")
      .refine(
        (value) => /[\p{L}\p{N}]/u.test(value),
        "Name must contain at least one letter or number",
      ),

    email: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, "Email is required")
      .email("Invalid email address")
      .max(254, "Email is too long"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(72, "Password must be at most 72 characters")
      .regex(
        /^[\x20-\x7E]+$/,
        "Password must contain only English letters, numbers, and common ASCII symbols",
      )
      .refine(
        (value) => /\S/.test(value),
        "Password cannot contain only spaces",
      ),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(254, "Email is too long"),

  password: z
    .string()
    .min(1, "Password is required"),
});
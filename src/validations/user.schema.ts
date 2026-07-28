import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name cannot exceed 100 characters."),

  email: z
    .email("Please enter a valid email address.")
    .max(255, "Email cannot exceed 255 characters."),

  passwordHash: z
    .string()
    .min(8, "Password hash is invalid."),

  avatarId: z
    .string()
    .optional()
    .or(z.literal("")),
});

export const createUserWithPasswordSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name cannot exceed 100 characters."),

  email: z
    .email("Please enter a valid email address.")
    .max(255, "Email cannot exceed 255 characters."),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(128, "Password cannot exceed 128 characters."),

  avatarId: z
    .string()
    .optional()
    .or(z.literal("")),
});

export const updateUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name cannot exceed 100 characters.")
    .optional(),

  email: z
    .email("Please enter a valid email address.")
    .max(255, "Email cannot exceed 255 characters.")
    .optional(),

  passwordHash: z
    .string()
    .min(8, "Password hash is invalid.")
    .optional(),

  avatarId: z
    .string()
    .optional()
    .or(z.literal("")),
});

export type CreateUserInput = z.infer<
  typeof createUserSchema
>;

export type CreateUserWithPasswordInput = z.infer<
  typeof createUserWithPasswordSchema
>;

export type UpdateUserInput = z.infer<
  typeof updateUserSchema
>;
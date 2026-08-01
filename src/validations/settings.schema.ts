import { z } from "zod";

export const updateSettingSchema = z.object({
  siteTitle: z
    .string()
    .trim()
    .min(2, "Site title must be at least 2 characters.")
    .max(100, "Site title cannot exceed 100 characters.")
    .optional(),

  siteDescription: z
    .string()
    .trim()
    .max(500, "Site description cannot exceed 500 characters.")
    .optional()
    .or(z.literal("")),

  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters.")
    .max(100, "Full name cannot exceed 100 characters.")
    .optional(),

  tagline: z
    .string()
    .trim()
    .max(200, "Tagline cannot exceed 200 characters.")
    .optional()
    .or(z.literal("")),

  bio: z
    .string()
    .trim()
    .max(5000, "Bio cannot exceed 5000 characters.")
    .optional()
    .or(z.literal("")),

  email: z
    .email("Please enter a valid email address.")
    .optional()
    .or(z.literal("")),

  phone: z
    .string()
    .trim()
    .max(30, "Phone number cannot exceed 30 characters.")
    .optional()
    .or(z.literal("")),

  location: z
    .string()
    .trim()
    .max(150, "Location cannot exceed 150 characters.")
    .optional()
    .or(z.literal("")),

  profileImageId: z
  .string()
  .trim()
  .optional()
  .or(z.literal("")),

resumeAssetId: z
  .string()
  .trim()
  .optional()
  .or(z.literal("")),
});

export type UpdateSettingInput = z.infer<
  typeof updateSettingSchema
>;
import { z } from "zod";


export const createAchievementSchema = z.object({

  title: z
    .string()
    .trim()
    .min(2, "Achievement title must be at least 2 characters.")
    .max(200, "Achievement title cannot exceed 200 characters."),


  description: z
    .string()
    .trim()
    .max(5000, "Description cannot exceed 5000 characters.")
    .optional()
    .or(z.literal("")),


  category: z
    .string()
    .trim()
    .max(100, "Category cannot exceed 100 characters.")
    .optional()
    .or(z.literal("")),


  issuer: z
    .string()
    .trim()
    .max(200, "Issuer cannot exceed 200 characters.")
    .optional()
    .or(z.literal("")),


  issueDate: z
    .coerce
    .date()
    .optional(),


  credentialUrl: z
    .string()
    .trim()
    .url("Please enter a valid URL.")
    .max(1000, "URL cannot exceed 1000 characters.")
    .optional()
    .or(z.literal("")),


  imageId: z
    .string()
    .optional()
    .or(z.literal("")),


  displayOrder: z
    .number()
    .int("Display order must be an integer.")
    .min(0, "Display order cannot be negative.")
    .default(0),


  visible: z
    .boolean()
    .default(true),

});



export const updateAchievementSchema =
  createAchievementSchema.partial();



export type CreateAchievementInput =
  z.input<typeof createAchievementSchema>;


export type CreateAchievementOutput =
  z.output<typeof createAchievementSchema>;



export type UpdateAchievementInput =
  z.input<typeof updateAchievementSchema>;


export type UpdateAchievementOutput =
  z.output<typeof updateAchievementSchema>;
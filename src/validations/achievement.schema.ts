import { z } from "zod";

import {
  optionalDate,
  optionalHttpUrl,
  optionalTrimmedString,
} from "@/validations/helpers";


export const createAchievementSchema = z.object({

  title: z
    .string()
    .trim()
    .min(2, "Achievement title must be at least 2 characters.")
    .max(200, "Achievement title cannot exceed 200 characters."),


  description: optionalTrimmedString(
    5000,
    "Description cannot exceed 5000 characters."
  ),


  category: optionalTrimmedString(
    100,
    "Category cannot exceed 100 characters."
  ),


  issuer: optionalTrimmedString(
    200,
    "Issuer cannot exceed 200 characters."
  ),


  issueDate: optionalDate,


  credentialUrl: optionalHttpUrl(1000),


  imageId: optionalTrimmedString(),


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

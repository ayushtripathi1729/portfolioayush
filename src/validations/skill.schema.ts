import { z } from "zod";


const slugRegex =
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/;



export const SKILL_LEVELS = [
  "BEGINNER",
  "INTERMEDIATE",
  "ADVANCED",
  "EXPERT",
] as const;



export const createSkillSchema =
  z.object({

    name: z
      .string()
      .trim()
      .min(
        2,
        "Name must be at least 2 characters."
      )
      .max(
        100,
        "Name cannot exceed 100 characters."
      ),



    slug: z
      .string()
      .trim()
      .min(
        2,
        "Slug must be at least 2 characters."
      )
      .max(
        100,
        "Slug cannot exceed 100 characters."
      )
      .regex(
        slugRegex,
        "Slug must contain only lowercase letters, numbers, and hyphens."
      ),



    level: z.enum(
      SKILL_LEVELS
    ),



    icon: z
      .string()
      .trim()
      .max(
        255,
        "Icon cannot exceed 255 characters."
      )
      .optional()
      .or(
        z.literal("")
      ),



    displayOrder: z
      .number()
      .int(
        "Display order must be an integer."
      )
      .min(
        0,
        "Display order cannot be negative."
      )
      .default(0),



    featured: z
      .boolean()
      .default(false),



    visible: z
      .boolean()
      .default(true),



    categoryId: z
      .string()
      .min(
        1,
        "Category is required."
      ),

  });




export const updateSkillSchema =
  createSkillSchema.partial();





export type CreateSkillInput =
  z.input<
    typeof createSkillSchema
  >;



export type UpdateSkillInput =
  z.input<
    typeof updateSkillSchema
  >;



export type CreateSkillOutput =
  z.output<
    typeof createSkillSchema
  >;



export type UpdateSkillOutput =
  z.output<
    typeof updateSkillSchema
  >;
import { z } from "zod";


const slugRegex =
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/;





export const createSkillCategorySchema =
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





    description: z
      .string()
      .trim()
      .max(
        500,
        "Description cannot exceed 500 characters."
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


  });







export const updateSkillCategorySchema =
  createSkillCategorySchema.partial();







// Input types for React Hook Form

export type CreateSkillCategoryInput =
  z.input<
    typeof createSkillCategorySchema
  >;



export type UpdateSkillCategoryInput =
  z.input<
    typeof updateSkillCategorySchema
  >;







// Output types after validation

export type CreateSkillCategoryOutput =
  z.output<
    typeof createSkillCategorySchema
  >;



export type UpdateSkillCategoryOutput =
  z.output<
    typeof updateSkillCategorySchema
  >;
import { z } from "zod";

import {
  PROJECT_STATUSES,
} from "@/constants/project";


const slugRegex =
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/;


const optionalUrl = z
  .string()
  .trim()
  .url("Please enter a valid URL.")
  .optional()
  .or(z.literal(""))
  .transform((value) =>
    value === ""
      ? undefined
      : value
  );



export const createProjectSchema =
  z.object({

    title: z
      .string()
      .trim()
      .min(
        3,
        "Title must be at least 3 characters."
      )
      .max(
        200,
        "Title cannot exceed 200 characters."
      ),


    slug: z
      .string()
      .trim()
      .min(
        2,
        "Slug must be at least 2 characters."
      )
      .max(
        200,
        "Slug cannot exceed 200 characters."
      )
      .regex(
        slugRegex,
        "Slug must contain only lowercase letters, numbers, and hyphens."
      ),


    shortDescription: z
      .string()
      .trim()
      .min(
        10,
        "Short description must be at least 10 characters."
      )
      .max(
        500,
        "Short description cannot exceed 500 characters."
      ),


    description: z
      .string()
      .trim()
      .min(
        20,
        "Description must be at least 20 characters."
      ),


    githubUrl: optionalUrl,


    liveUrl: optionalUrl,


    featured: z
      .boolean()
      .default(false),


    visible: z
      .boolean()
      .default(true),


    status: z
      .enum(PROJECT_STATUSES)
      .default("DRAFT"),


    displayOrder: z
      .number()
      .int()
      .min(0)
      .default(0),


    categoryId: z
      .string()
      .min(
        1,
        "Project category is required."
      ),

  });



export const updateProjectSchema =
  createProjectSchema.partial();



export type CreateProjectInput =
  z.input<
    typeof createProjectSchema
  >;


export type UpdateProjectInput =
  z.input<
    typeof updateProjectSchema
  >;
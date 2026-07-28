import { z } from "zod";

import { ProjectStatus } from "../../generated/prisma/client";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const createProjectSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters.")
    .max(200, "Title cannot exceed 200 characters."),

  slug: z
    .string()
    .trim()
    .min(2, "Slug must be at least 2 characters.")
    .max(200, "Slug cannot exceed 200 characters.")
    .regex(
      slugRegex,
      "Slug must contain only lowercase letters, numbers, and hyphens."
    ),

  shortDescription: z
    .string()
    .trim()
    .min(10, "Short description must be at least 10 characters.")
    .max(500, "Short description cannot exceed 500 characters."),

  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters."),

  githubUrl: z
    .string()
    .trim()
    .url("Please enter a valid GitHub URL.")
    .optional()
    .or(z.literal("")),

  liveUrl: z
    .string()
    .trim()
    .url("Please enter a valid live URL.")
    .optional()
    .or(z.literal("")),

  featured: z.boolean().default(false),

  visible: z.boolean().default(true),

  status: z
    .nativeEnum(ProjectStatus)
    .default(ProjectStatus.DRAFT),

  displayOrder: z
    .number()
    .int("Display order must be an integer.")
    .min(0, "Display order cannot be negative.")
    .default(0),

  categoryId: z
    .string()
    .min(1, "Project category is required."),
});

export const updateProjectSchema =
  createProjectSchema.partial();

export type CreateProjectInput = z.infer<
  typeof createProjectSchema
>;

export type UpdateProjectInput = z.infer<
  typeof updateProjectSchema
>;
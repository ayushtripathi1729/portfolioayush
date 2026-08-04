import { z } from "zod";
import { optionalHttpUrl } from "@/validations/helpers";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const createTechnologySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name cannot exceed 100 characters."),

  slug: z
    .string()
    .trim()
    .min(2, "Slug must be at least 2 characters.")
    .max(100, "Slug cannot exceed 100 characters.")
    .regex(
      slugRegex,
      "Slug must contain only lowercase letters, numbers, and hyphens."
    ),

  icon: z
    .string()
    .trim()
    .max(255, "Icon cannot exceed 255 characters.")
    .optional()
    .or(z.literal("")),

  color: z
    .string()
    .trim()
    .max(50, "Color cannot exceed 50 characters.")
    .optional()
    .or(z.literal("")),

  website: optionalHttpUrl(255),

  displayOrder: z
    .number()
    .int("Display order must be an integer.")
    .min(0, "Display order cannot be negative.")
    .default(0),

  visible: z.boolean().default(true),
});

export const updateTechnologySchema =
  createTechnologySchema.partial();

export type CreateTechnologyInput = z.infer<
  typeof createTechnologySchema
>;

export type UpdateTechnologyInput = z.infer<
  typeof updateTechnologySchema
>;

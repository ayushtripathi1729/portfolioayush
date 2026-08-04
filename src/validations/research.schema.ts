import { z } from "zod";

import {
  optionalDate,
  optionalTrimmedString,
} from "@/validations/helpers";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const createResearchSchema = z.object({
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

  abstract: optionalTrimmedString(
    10000,
    "Abstract cannot exceed 10000 characters."
  ),

  publisher: optionalTrimmedString(
    200,
    "Publisher cannot exceed 200 characters."
  ),

  journal: optionalTrimmedString(
    200,
    "Journal cannot exceed 200 characters."
  ),

  doi: optionalTrimmedString(
    255,
    "DOI cannot exceed 255 characters."
  ),

  externalUrl: z
    .string()
    .trim()
    .url("Please enter a valid URL.")
    .max(500, "URL cannot exceed 500 characters.")
    .optional()
    .or(z.literal("")),

  publishedAt: optionalDate,

  pdfAssetId: optionalTrimmedString(),

  coverImageId: optionalTrimmedString(),

  featured: z.boolean().default(false),

  visible: z.boolean().default(true),

  displayOrder: z
    .number()
    .int("Display order must be an integer.")
    .min(0, "Display order cannot be negative.")
    .default(0),
});

export const updateResearchSchema =
  createResearchSchema.partial();

export type CreateResearchInput = z.input<
  typeof createResearchSchema
>;

export type UpdateResearchInput = z.input<
  typeof updateResearchSchema
>;


export type CreateResearchOutput = z.output<
  typeof createResearchSchema
>;

export type UpdateResearchOutput = z.output<
  typeof updateResearchSchema
>;

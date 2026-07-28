import { z } from "zod";

import { AssetType } from "../../generated/prisma/client";

export const createAssetSchema = z.object({
  fileName: z
    .string()
    .trim()
    .min(1, "File name is required.")
    .max(255, "File name cannot exceed 255 characters."),

  originalName: z
    .string()
    .trim()
    .min(1, "Original file name is required.")
    .max(255, "Original file name cannot exceed 255 characters."),

  url: z
    .string()
    .trim()
    .url("Please enter a valid file URL.")
    .max(1000, "URL cannot exceed 1000 characters."),

  mimeType: z
    .string()
    .trim()
    .min(1, "MIME type is required.")
    .max(100, "MIME type cannot exceed 100 characters."),

  type: z.nativeEnum(AssetType),

  extension: z
    .string()
    .trim()
    .max(20, "Extension cannot exceed 20 characters.")
    .optional()
    .or(z.literal("")),

  size: z
    .number()
    .int("File size must be an integer.")
    .positive("File size must be greater than zero."),

  width: z
    .number()
    .int("Width must be an integer.")
    .positive("Width must be greater than zero.")
    .optional(),

  height: z
    .number()
    .int("Height must be an integer.")
    .positive("Height must be greater than zero.")
    .optional(),

  altText: z
    .string()
    .trim()
    .max(255, "Alt text cannot exceed 255 characters.")
    .optional()
    .or(z.literal("")),
});

export const updateAssetSchema =
  createAssetSchema.partial();

export type CreateAssetInput = z.infer<
  typeof createAssetSchema
>;

export type UpdateAssetInput = z.infer<
  typeof updateAssetSchema
>;
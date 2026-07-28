import { z } from "zod";

import { SocialPlatform } from "../../generated/prisma/client";

export const createSocialLinkSchema = z.object({
  platform: z.nativeEnum(SocialPlatform),

  label: z
    .string()
    .trim()
    .max(100, "Label cannot exceed 100 characters.")
    .optional()
    .or(z.literal("")),

  url: z
    .string()
    .trim()
    .url("Please enter a valid URL.")
    .max(500, "URL cannot exceed 500 characters."),

  username: z
    .string()
    .trim()
    .max(100, "Username cannot exceed 100 characters.")
    .optional()
    .or(z.literal("")),

  displayOrder: z
    .number()
    .int("Display order must be an integer.")
    .min(0, "Display order cannot be negative.")
    .default(0),

  visible: z.boolean().default(true),

  settingId: z
    .string()
    .min(1, "Setting ID is required."),
});

export const updateSocialLinkSchema =
  createSocialLinkSchema.partial();

export type CreateSocialLinkInput = z.infer<
  typeof createSocialLinkSchema
>;

export type UpdateSocialLinkInput = z.infer<
  typeof updateSocialLinkSchema
>;  
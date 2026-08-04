import { z } from "zod";
import { httpUrl } from "@/validations/helpers";


export const socialPlatformValues = [
  "GITHUB",
  "LINKEDIN",
  "LEETCODE",
  "CODEFORCES",
  "CODECHEF",
  "HACKERRANK",
  "HACKERONE",
  "TRYHACKME",
  "ROOTME",
  "HTB",
  "CTFTIME",
  "INTIGRITI",
  "BUGCROWD",
  "KAGGLE",
  "GOOGLE_SCHOLAR",
  "ORCID",
  "RESEARCHGATE",
  "MEDIUM",
  "DEVTO",
  "YOUTUBE",
  "X",
  "INSTAGRAM",
  "FACEBOOK",
  "CUSTOM",
] as const;



export const createSocialLinkSchema = z.object({

  platform: z.enum(
    socialPlatformValues
  ),


  label: z
    .string()
    .trim()
    .max(100, "Label cannot exceed 100 characters.")
    .optional()
    .or(z.literal("")),


  url: httpUrl(500),


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


  visible: z
    .boolean()
    .default(true),


  settingId: z
    .string()
    .min(1, "Setting ID is required."),

});



export const updateSocialLinkSchema =
  createSocialLinkSchema
    .omit({ settingId: true })
    .partial();



export type CreateSocialLinkInput =
  z.infer<
    typeof createSocialLinkSchema
  >;



export type UpdateSocialLinkInput =
  z.infer<
    typeof updateSocialLinkSchema
  >;

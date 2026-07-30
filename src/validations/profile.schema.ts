import { z } from "zod";


export const updateProfileSchema = z.object({

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


  avatarId: z
    .string()
    .optional()
    .or(
      z.literal("")
    ),

});



export const changePasswordSchema = z.object({

  currentPassword: z
    .string()
    .min(
      8,
      "Current password must be at least 8 characters."
    ),


  newPassword: z
    .string()
    .min(
      8,
      "New password must be at least 8 characters."
    )
    .max(
      128,
      "Password cannot exceed 128 characters."
    ),

});



export type UpdateProfileInput =
  z.infer<
    typeof updateProfileSchema
  >;



export type ChangePasswordInput =
  z.infer<
    typeof changePasswordSchema
  >;
import { z } from "zod";

export const createContactMessageSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name cannot exceed 100 characters."),

  email: z
    .email("Please enter a valid email address.")
    .max(255, "Email cannot exceed 255 characters."),

  subject: z
    .string()
    .trim()
    .max(200, "Subject cannot exceed 200 characters.")
    .optional()
    .or(z.literal("")),

  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(5000, "Message cannot exceed 5000 characters."),
});

export const updateContactMessageSchema = z.object({
  isRead: z.boolean().optional(),
  isReplied: z.boolean().optional(),
});

export type CreateContactMessageInput = z.infer<
  typeof createContactMessageSchema
>;

export type UpdateContactMessageInput = z.infer<
  typeof updateContactMessageSchema
>;
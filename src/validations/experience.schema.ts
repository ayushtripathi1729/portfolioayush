import { z } from "zod";

import {
  optionalDate,
  optionalTrimmedString,
} from "@/validations/helpers";

const experienceFields = {
  company: z
    .string()
    .trim()
    .min(2, "Company name must be at least 2 characters.")
    .max(150, "Company name cannot exceed 150 characters."),

  position: z
    .string()
    .trim()
    .min(2, "Position must be at least 2 characters.")
    .max(150, "Position cannot exceed 150 characters."),

  employmentType: optionalTrimmedString(
    100,
    "Employment type cannot exceed 100 characters."
  ),

  location: optionalTrimmedString(
    150,
    "Location cannot exceed 150 characters."
  ),

  startDate: z.coerce.date({
    message: "Start date is required.",
  }),

  endDate: optionalDate,

  isCurrent: z.boolean().default(false),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters.")
    .max(5000, "Description cannot exceed 5000 characters."),

  companyLogoId: optionalTrimmedString(),

  displayOrder: z
    .number()
    .int("Display order must be an integer.")
    .min(0, "Display order cannot be negative.")
    .default(0),

  visible: z.boolean().default(true),
};


export const createExperienceSchema = z
  .object(experienceFields)
  .refine(
    (data) => {
      if (data.isCurrent) {
        return !data.endDate;
      }

      return true;
    },
    {
      message:
        "Current experience should not have an end date.",
      path: ["endDate"],
    }
  )
  .refine(
    (data) => {
      if (data.endDate) {
        return data.endDate >= data.startDate;
      }

      return true;
    },
    {
      message:
        "End date cannot be before start date.",
      path: ["endDate"],
    }
  );


export const updateExperienceSchema = z.object({
  company: experienceFields.company.optional(),

  position: experienceFields.position.optional(),

  employmentType:
    experienceFields.employmentType,

  location:
    experienceFields.location,

  startDate:
    experienceFields.startDate.optional(),

  endDate:
    experienceFields.endDate,

  isCurrent:
    experienceFields.isCurrent.optional(),

  description:
    experienceFields.description.optional(),

  companyLogoId:
    experienceFields.companyLogoId,

  displayOrder:
    experienceFields.displayOrder.optional(),

  visible:
    experienceFields.visible.optional(),
});


export type CreateExperienceInput = z.input<
  typeof createExperienceSchema
>;

export type UpdateExperienceInput = z.input<
  typeof updateExperienceSchema
>;


export type CreateExperienceOutput = z.output<
  typeof createExperienceSchema
>;

export type UpdateExperienceOutput = z.output<
  typeof updateExperienceSchema
>;

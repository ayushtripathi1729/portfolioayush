import { z } from "zod";


const GradeTypeEnum = z.enum([
  "CGPA",
  "PERCENTAGE",
]);


const educationFields = {

  institution: z
    .string()
    .trim()
    .min(
      2,
      "Institution name must be at least 2 characters."
    )
    .max(
      200,
      "Institution name cannot exceed 200 characters."
    ),


  degree: z
    .string()
    .trim()
    .min(
      2,
      "Degree must be at least 2 characters."
    )
    .max(
      150,
      "Degree cannot exceed 150 characters."
    ),


  branch: z
    .string()
    .trim()
    .max(
      150,
      "Branch cannot exceed 150 characters."
    )
    .optional()
    .or(z.literal("")),


  location: z
    .string()
    .trim()
    .max(
      150,
      "Location cannot exceed 150 characters."
    )
    .optional()
    .or(z.literal("")),


  startDate: z.coerce.date({
    message: "Start date is required.",
  }),


  endDate: z.coerce.date().optional(),


  isCurrent: z.boolean().default(false),


  gradeType: GradeTypeEnum,


  gradeValue: z
    .number()
    .min(
      0,
      "Grade cannot be negative."
    )
    .max(
      100,
      "Grade cannot exceed 100."
    ),


  description: z
    .string()
    .trim()
    .max(
      5000,
      "Description cannot exceed 5000 characters."
    )
    .optional()
    .or(z.literal("")),


  institutionLogoId: z
    .string()
    .optional()
    .or(z.literal("")),


  displayOrder: z
    .number()
    .int(
      "Display order must be an integer."
    )
    .min(
      0,
      "Display order cannot be negative."
    )
    .default(0),


  visible: z.boolean().default(true),

};





export const createEducationSchema = z
  .object(educationFields)
  .refine(
    (data) => {

      if (data.isCurrent) {
        return !data.endDate;
      }

      return true;

    },
    {
      message:
        "Current education should not have an end date.",
      path: [
        "endDate",
      ],
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
      path: [
        "endDate",
      ],
    }
  );





export const updateEducationSchema = z.object({

  institution:
    educationFields.institution.optional(),


  degree:
    educationFields.degree.optional(),


  branch:
    educationFields.branch,


  location:
    educationFields.location,


  startDate:
    educationFields.startDate.optional(),


  endDate:
    educationFields.endDate,


  isCurrent:
    educationFields.isCurrent.optional(),


  gradeType:
    educationFields.gradeType.optional(),


  gradeValue:
    educationFields.gradeValue.optional(),


  description:
    educationFields.description,


  institutionLogoId:
    educationFields.institutionLogoId,


  displayOrder:
    educationFields.displayOrder.optional(),


  visible:
    educationFields.visible.optional(),

});





export type CreateEducationInput =
  z.input<typeof createEducationSchema>;

export type CreateEducationOutput =
  z.output<typeof createEducationSchema>;


export type UpdateEducationInput =
  z.input<typeof updateEducationSchema>;

export type UpdateEducationOutput =
  z.output<typeof updateEducationSchema>;
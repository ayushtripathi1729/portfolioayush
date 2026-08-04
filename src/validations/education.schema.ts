import { z } from "zod";

import {
  nullableDate,
  nullableTrimmedString,
} from "@/validations/helpers";


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



  branch: nullableTrimmedString(
    150,
    "Branch cannot exceed 150 characters."
  ),



  location: nullableTrimmedString(
    150,
    "Location cannot exceed 150 characters."
  ),



  startDate: z.coerce.date({
    message: "Start date is required.",
  }),



  endDate: nullableDate,



  isCurrent: z
    .boolean()
    .default(false),



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



  description: nullableTrimmedString(
    5000,
    "Description cannot exceed 5000 characters."
  ),



  institutionLogoId: nullableTrimmedString(),



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



  visible: z
    .boolean()
    .default(true),

};





function validateEducationDates(
  data: {
    startDate?: Date;
    endDate?: Date | null;
    isCurrent?: boolean;
  },
  ctx: z.RefinementCtx
) {


  // Current education cannot have end date
  if (
    data.isCurrent &&
    data.endDate
  ) {

    ctx.addIssue({

      code: z.ZodIssueCode.custom,

      path: [
        "endDate",
      ],

      message:
        "Current education cannot have an end date.",

    });

  }



  // Completed education requires end date
  if (
    data.isCurrent === false &&
    !data.endDate
  ) {

    ctx.addIssue({

      code: z.ZodIssueCode.custom,

      path: [
        "endDate",
      ],

      message:
        "Completed education requires an end date.",

    });

  }



  // End date cannot be before start date
  if (
    data.endDate &&
    data.startDate &&
    data.endDate < data.startDate
  ) {

    ctx.addIssue({

      code: z.ZodIssueCode.custom,

      path: [
        "endDate",
      ],

      message:
        "End date cannot be before start date.",

    });

  }

}






export const createEducationSchema =
  z
    .object(educationFields)
    .superRefine(
      validateEducationDates
    );







export const updateEducationSchema =
  z
    .object({

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


    })
    .superRefine(
      validateEducationDates
    );






export type CreateEducationInput =
  z.input<
    typeof createEducationSchema
  >;



export type CreateEducationOutput =
  z.output<
    typeof createEducationSchema
  >;



export type UpdateEducationInput =
  z.input<
    typeof updateEducationSchema
  >;



export type UpdateEducationOutput =
  z.output<
    typeof updateEducationSchema
  >;

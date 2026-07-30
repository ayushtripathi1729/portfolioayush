import {
  Prisma,
  GradeType,
} from "../../generated/prisma/client";

import { educationRepository } from "@/repositories/education.repository";
import { logActivity } from "@/lib/activity";



interface CreateEducationInput {

  institution: string;

  degree: string;

  branch?: string | null;

  location?: string | null;

  startDate: Date;

  endDate?: Date | null;

  isCurrent: boolean;

  gradeType: GradeType;

  gradeValue: number;

  description?: string | null;

  institutionLogoId?: string | null;

  displayOrder: number;

  visible: boolean;

}







export class EducationService {




  async getAll() {

    return educationRepository.findAll();

  }






  async getAllIncludingHidden() {

    return educationRepository.findAllIncludingHidden();

  }






  async getCurrent() {

    return educationRepository.findCurrent();

  }






  async getById(
    id: string
  ) {

    return educationRepository.findById(id);

  }







  async create(
    data: CreateEducationInput
  ) {


    const {
      institutionLogoId,
      ...educationFields
    } = data;





    const educationData: Prisma.EducationCreateInput = {


      ...educationFields,



      institutionLogo:
        institutionLogoId
          ? {
              connect: {
                id: institutionLogoId,
              },
            }
          : undefined,


    };





    const education =
      await educationRepository.create(
        educationData
      );





    await logActivity({

      action: "CREATE",

      entity: "Education",

      entityId: education.id,

      description:
        `Added education "${education.institution}"`,

    });





    return education;


  }









  async update(
    id: string,
    data: Prisma.EducationUpdateInput & {
      institutionLogoId?: string | null;
    }
  ) {


    const {
      institutionLogoId,
      ...rest
    } = data;





    const educationData: Prisma.EducationUpdateInput = {


      ...rest,



      institutionLogo:
        institutionLogoId
          ? {
              connect: {
                id: institutionLogoId,
              },
            }
          : {
              disconnect: true,
            },


    };





    const education =
      await educationRepository.update(
        id,
        educationData
      );





    await logActivity({

      action: "UPDATE",

      entity: "Education",

      entityId: education.id,

      description:
        `Updated education "${education.institution}"`,

    });





    return education;


  }









  async delete(
    id: string
  ) {


    const education =
      await educationRepository.findById(
        id
      );





    const deleted =
      await educationRepository.delete(
        id
      );





    await logActivity({

      action: "DELETE",

      entity: "Education",

      entityId: id,

      description:
        education
          ? `Deleted education "${education.institution}"`
          : "Deleted education",

    });





    return deleted;


  }








  async count() {

    return educationRepository.count();

  }



}







export const educationService =
  new EducationService();
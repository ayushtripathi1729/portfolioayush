import {
  Prisma,
  GradeType,
} from "../../generated/prisma/client";

import { educationRepository } from "@/repositories/education.repository";



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





    return educationRepository.create(
      educationData
    );


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



  return educationRepository.update(
    id,
    educationData
  );

}





  async delete(
    id: string
  ) {

    return educationRepository.delete(
      id
    );

  }





  async count() {

    return educationRepository.count();

  }


}





export const educationService =
  new EducationService();
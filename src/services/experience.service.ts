import { Prisma } from "../../generated/prisma/client";

import { experienceRepository } from "@/repositories/experience.repository";
import { logActivity } from "@/lib/activity";


export class ExperienceService {



  async getAll() {

    return experienceRepository.findAll();

  }





  async getAllIncludingHidden() {

    return experienceRepository.findAllIncludingHidden();

  }





  async getCurrent() {

    return experienceRepository.findCurrent();

  }





  async getById(
    id: string
  ) {

    return experienceRepository.findById(
      id
    );

  }





  async create(
    data: Prisma.ExperienceCreateInput
  ) {


    const experience =
      await experienceRepository.create(
        data
      );



    await logActivity({

      action: "CREATE",

      entity: "Experience",

      entityId: experience.id,

      description:
        `Added experience "${experience.position} at ${experience.company}"`,

    });



    return experience;

  }








  async update(
    id: string,
    data: Prisma.ExperienceUpdateInput
  ) {


    const experience =
      await experienceRepository.update(
        id,
        data
      );



    await logActivity({

      action: "UPDATE",

      entity: "Experience",

      entityId: experience.id,

      description:
        `Updated experience "${experience.position} at ${experience.company}"`,

    });



    return experience;

  }








  async delete(
    id: string
  ) {


    const experience =
      await experienceRepository.findById(
        id
      );



    const deleted =
      await experienceRepository.delete(
        id
      );



    await logActivity({

      action: "DELETE",

      entity: "Experience",

      entityId: id,

      description:
        experience
          ? `Deleted experience "${experience.position} at ${experience.company}"`
          : "Deleted experience",

    });



    return deleted;

  }








  async count() {

    return experienceRepository.count();

  }


}





export const experienceService =
  new ExperienceService();
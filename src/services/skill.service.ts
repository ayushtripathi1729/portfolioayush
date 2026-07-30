import { Prisma } from "../../generated/prisma/client";

import { skillRepository } from "@/repositories/skill.repository";
import { logActivity } from "@/lib/activity";



export class SkillService {



  async getAll() {

    return skillRepository.findAll();

  }





  async getFeatured() {

    return skillRepository.findFeatured();

  }





  async getById(
    id: string
  ) {

    return skillRepository.findById(
      id
    );

  }





  async getBySlug(
    slug: string
  ) {

    return skillRepository.findBySlug(
      slug
    );

  }





  async create(
    data:
      | Prisma.SkillCreateInput
      | Prisma.SkillUncheckedCreateInput
  ) {


    const skill =
      await skillRepository.create(
        data
      );



    await logActivity({

      action: "CREATE",

      entity: "Skill",

      entityId: skill.id,

      description:
        `Added skill "${skill.name}"`,

    });



    return skill;

  }








  async update(
    id: string,
    data: Prisma.SkillUpdateInput
  ) {


    const skill =
      await skillRepository.update(
        id,
        data
      );



    await logActivity({

      action: "UPDATE",

      entity: "Skill",

      entityId: skill.id,

      description:
        `Updated skill "${skill.name}"`,

    });



    return skill;

  }








  async delete(
    id: string
  ) {


    const skill =
      await skillRepository.findById(
        id
      );



    const deleted =
      await skillRepository.delete(
        id
      );



    await logActivity({

      action: "DELETE",

      entity: "Skill",

      entityId: id,

      description:
        skill
          ? `Deleted skill "${skill.name}"`
          : "Deleted skill",

    });



    return deleted;

  }








  async count() {

    return skillRepository.count();

  }


}





export const skillService =
  new SkillService();
import { Prisma } from "../../generated/prisma/client";

import { skillCategoryRepository } from "@/repositories/skill-category.repository";
import { logActivity } from "@/lib/activity";



export class SkillCategoryService {





  async getAll() {

    return skillCategoryRepository.findAll();

  }









  async getFeatured() {

    return skillCategoryRepository.findFeatured();

  }









  async getAllIncludingHidden() {

    return skillCategoryRepository.findAllIncludingHidden();

  }









  async getById(
    id: string
  ) {

    return skillCategoryRepository.findById(
      id
    );

  }









  async getBySlug(
    slug: string
  ) {

    return skillCategoryRepository.findBySlug(
      slug
    );

  }









  async create(
    data: Prisma.SkillCategoryCreateInput
  ) {


    const category =
      await skillCategoryRepository.create(
        data
      );



    await logActivity({

      action: "CREATE",

      entity: "SkillCategory",

      entityId: category.id,

      description:
        `Created skill category "${category.name}"`,

    });



    return category;

  }









  async update(
    id: string,
    data: Prisma.SkillCategoryUpdateInput
  ) {


    const category =
      await skillCategoryRepository.update(
        id,
        data
      );



    await logActivity({

      action: "UPDATE",

      entity: "SkillCategory",

      entityId: category.id,

      description:
        `Updated skill category "${category.name}"`,

    });



    return category;

  }









  async delete(
    id: string
  ) {


    const category =
      await skillCategoryRepository.findById(
        id
      );



    const deleted =
      await skillCategoryRepository.delete(
        id
      );



    await logActivity({

      action: "DELETE",

      entity: "SkillCategory",

      entityId: id,

      description:
        category
          ? `Deleted skill category "${category.name}"`
          : "Deleted skill category",

    });



    return deleted;

  }









  async count() {

    return skillCategoryRepository.count();

  }



}





export const skillCategoryService =
  new SkillCategoryService();
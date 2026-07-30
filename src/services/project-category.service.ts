import { Prisma } from "../../generated/prisma/client";

import { projectCategoryRepository } from "@/repositories/project-category.repository";
import { logActivity } from "@/lib/activity";



export class ProjectCategoryService {



  async getAll() {

    return projectCategoryRepository.findAll();

  }





  async getAllIncludingHidden() {

    return projectCategoryRepository.findAllIncludingHidden();

  }





  async getById(
    id: string
  ) {

    return projectCategoryRepository.findById(
      id
    );

  }





  async getBySlug(
    slug: string
  ) {

    return projectCategoryRepository.findBySlug(
      slug
    );

  }





  async create(
    data: Prisma.ProjectCategoryCreateInput
  ) {


    const category =
      await projectCategoryRepository.create(
        data
      );



    await logActivity({

      action: "CREATE",

      entity: "ProjectCategory",

      entityId: category.id,

      description:
        `Created project category "${category.name}"`,

    });



    return category;

  }








  async update(
    id: string,
    data: Prisma.ProjectCategoryUpdateInput
  ) {


    const category =
      await projectCategoryRepository.update(
        id,
        data
      );



    await logActivity({

      action: "UPDATE",

      entity: "ProjectCategory",

      entityId: category.id,

      description:
        `Updated project category "${category.name}"`,

    });



    return category;

  }








  async delete(
    id: string
  ) {


    const category =
      await projectCategoryRepository.findById(
        id
      );



    const deleted =
      await projectCategoryRepository.delete(
        id
      );



    await logActivity({

      action: "DELETE",

      entity: "ProjectCategory",

      entityId: id,

      description:
        category
          ? `Deleted project category "${category.name}"`
          : "Deleted project category",

    });



    return deleted;

  }








  async count() {

    return projectCategoryRepository.count();

  }


}





export const projectCategoryService =
  new ProjectCategoryService();
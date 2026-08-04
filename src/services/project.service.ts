import { Prisma } from "../../generated/prisma/client";

import { projectRepository } from "@/repositories/project.repository";
import { logActivity } from "@/lib/activity";



export class ProjectService {



  async getAll() {

    return projectRepository.findAll();

  }





  async getPublished() {

    return projectRepository.findPublished();

  }





  async getById(
    id: string
  ) {

    return projectRepository.findById(
      id
    );

  }





  async getBySlug(
    slug: string
  ) {

    return projectRepository.findBySlug(
      slug
    );

  }





  async create(
    data:
      | Prisma.ProjectCreateInput
      | Prisma.ProjectUncheckedCreateInput
  ) {


    const project =
      await projectRepository.create(
        data
      );



    await logActivity({

      action: "CREATE",

      entity: "Project",

      entityId: project.id,

      description:
        `Created project "${project.title}"`,

    });



    return project;

  }








  async update(
    id: string,
    data: Prisma.ProjectUncheckedUpdateInput
  ) {


    const project =
      await projectRepository.update(
        id,
        data
      );



    await logActivity({

      action: "UPDATE",

      entity: "Project",

      entityId: project.id,

      description:
        `Updated project "${project.title}"`,

    });



    return project;

  }








  async delete(
    id: string
  ) {


    const project =
      await projectRepository.findById(
        id
      );



    const deleted =
      await projectRepository.delete(
        id
      );



    await logActivity({

      action: "DELETE",

      entity: "Project",

      entityId: id,

      description:
        project
          ? `Deleted project "${project.title}"`
          : "Deleted project",

    });



    return deleted;

  }








  async count() {

    return projectRepository.count();

  }


}





export const projectService =
  new ProjectService();

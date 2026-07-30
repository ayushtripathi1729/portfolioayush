import { Prisma } from "../../generated/prisma/client";

import { technologyRepository } from "@/repositories/technology.repository";
import { logActivity } from "@/lib/activity";



export class TechnologyService {



  async getAll() {

    return technologyRepository.findAll();

  }





  async getAllIncludingHidden() {

    return technologyRepository.findAllIncludingHidden();

  }





  async getWithPublishedProjects() {

    return technologyRepository.findWithPublishedProjects();

  }





  async getById(
    id: string
  ) {

    return technologyRepository.findById(
      id
    );

  }





  async getBySlug(
    slug: string
  ) {

    return technologyRepository.findBySlug(
      slug
    );

  }





  async create(
    data: Prisma.TechnologyCreateInput
  ) {


    const technology =
      await technologyRepository.create(
        data
      );



    await logActivity({

      action: "CREATE",

      entity: "Technology",

      entityId: technology.id,

      description:
        `Added technology "${technology.name}"`,

    });



    return technology;

  }








  async update(
    id: string,
    data: Prisma.TechnologyUpdateInput
  ) {


    const technology =
      await technologyRepository.update(
        id,
        data
      );



    await logActivity({

      action: "UPDATE",

      entity: "Technology",

      entityId: technology.id,

      description:
        `Updated technology "${technology.name}"`,

    });



    return technology;

  }








  async delete(
    id: string
  ) {


    const technology =
      await technologyRepository.findById(
        id
      );



    const deleted =
      await technologyRepository.delete(
        id
      );



    await logActivity({

      action: "DELETE",

      entity: "Technology",

      entityId: id,

      description:
        technology
          ? `Deleted technology "${technology.name}"`
          : "Deleted technology",

    });



    return deleted;

  }








  async count() {

    return technologyRepository.count();

  }


}





export const technologyService =
  new TechnologyService();
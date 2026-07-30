import { Prisma } from "../../generated/prisma/client";

import { researchRepository } from "@/repositories/research.repository";
import { logActivity } from "@/lib/activity";



export class ResearchService {



  async getAll() {

    return researchRepository.findAll();

  }





  async getAllIncludingHidden() {

    return researchRepository.findAllIncludingHidden();

  }





  async getFeatured() {

    return researchRepository.findFeatured();

  }





  async getById(
    id: string
  ) {

    return researchRepository.findById(
      id
    );

  }





  async getBySlug(
    slug: string
  ) {

    return researchRepository.findBySlug(
      slug
    );

  }





  async create(
    data: Prisma.ResearchCreateInput
  ) {


    const research =
      await researchRepository.create(
        data
      );



    await logActivity({

      action: "CREATE",

      entity: "Research",

      entityId: research.id,

      description:
        `Created research "${research.title}"`,

    });



    return research;

  }








  async update(
    id: string,
    data: Prisma.ResearchUpdateInput
  ) {


    const research =
      await researchRepository.update(
        id,
        data
      );



    await logActivity({

      action: "UPDATE",

      entity: "Research",

      entityId: research.id,

      description:
        `Updated research "${research.title}"`,

    });



    return research;

  }








  async delete(
    id: string
  ) {


    const research =
      await researchRepository.findById(
        id
      );



    const deleted =
      await researchRepository.delete(
        id
      );



    await logActivity({

      action: "DELETE",

      entity: "Research",

      entityId: id,

      description:
        research
          ? `Deleted research "${research.title}"`
          : "Deleted research",

    });



    return deleted;

  }








  async count() {

    return researchRepository.count();

  }


}





export const researchService =
  new ResearchService();
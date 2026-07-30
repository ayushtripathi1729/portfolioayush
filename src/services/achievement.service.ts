import { Prisma } from "../../generated/prisma/client";

import { achievementRepository } from "@/repositories/achievement.repository";
import { logActivity } from "@/lib/activity";


export class AchievementService {



  async getAll() {

    return achievementRepository.findAll();

  }





  async getAllIncludingHidden() {

    return achievementRepository.findAllIncludingHidden();

  }





  async getById(id: string) {

    return achievementRepository.findById(id);

  }





  async create(
    data: Prisma.AchievementCreateInput
  ) {


    const achievement =
      await achievementRepository.create(
        data
      );



    await logActivity({

      action: "CREATE",

      entity: "Achievement",

      entityId: achievement.id,

      description:
        `Created achievement "${achievement.title}"`,

    });



    return achievement;

  }







  async update(
    id: string,
    data: Prisma.AchievementUpdateInput
  ) {


    const achievement =
      await achievementRepository.update(
        id,
        data
      );



    await logActivity({

      action: "UPDATE",

      entity: "Achievement",

      entityId: achievement.id,

      description:
        `Updated achievement "${achievement.title}"`,

    });



    return achievement;

  }







  async delete(id: string) {


    const achievement =
      await achievementRepository.findById(
        id
      );



    const deleted =
      await achievementRepository.delete(
        id
      );



    await logActivity({

      action: "DELETE",

      entity: "Achievement",

      entityId: id,

      description:
        achievement
          ? `Deleted achievement "${achievement.title}"`
          : "Deleted achievement",

    });



    return deleted;

  }







  async count() {

    return achievementRepository.count();

  }


}




export const achievementService =
  new AchievementService();
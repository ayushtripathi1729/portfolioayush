import { Prisma } from "../../generated/prisma/client";

import { achievementRepository } from "@/repositories/achievement.repository";


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

    return achievementRepository.create(data);

  }



  async update(
    id: string,
    data: Prisma.AchievementUpdateInput
  ) {

    return achievementRepository.update(
      id,
      data
    );

  }



  async delete(id: string) {

    return achievementRepository.delete(id);

  }



  async count() {

    return achievementRepository.count();

  }

}



export const achievementService =
  new AchievementService();
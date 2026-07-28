import { Prisma } from "../../generated/prisma/client";

import { experienceRepository } from "@/repositories/experience.repository";

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

  async getById(id: string) {
    return experienceRepository.findById(id);
  }

  async create(data: Prisma.ExperienceCreateInput) {
    return experienceRepository.create(data);
  }

  async update(
    id: string,
    data: Prisma.ExperienceUpdateInput
  ) {
    return experienceRepository.update(id, data);
  }

  async delete(id: string) {
    return experienceRepository.delete(id);
  }

  async count() {
    return experienceRepository.count();
  }
}

export const experienceService = new ExperienceService();
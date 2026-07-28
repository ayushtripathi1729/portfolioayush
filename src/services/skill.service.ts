import { Prisma } from "../../generated/prisma/client";

import { skillRepository } from "@/repositories/skill.repository";

export class SkillService {
  async getAll() {
    return skillRepository.findAll();
  }

  async getFeatured() {
    return skillRepository.findFeatured();
  }

  async getById(id: string) {
    return skillRepository.findById(id);
  }

  async getBySlug(slug: string) {
    return skillRepository.findBySlug(slug);
  }

  async create(
    data:
      | Prisma.SkillCreateInput
      | Prisma.SkillUncheckedCreateInput
  ) {
    return skillRepository.create(data);
  }

  async update(
    id: string,
    data: Prisma.SkillUpdateInput
  ) {
    return skillRepository.update(id, data);
  }

  async delete(id: string) {
    return skillRepository.delete(id);
  }

  async count() {
    return skillRepository.count();
  }
}

export const skillService = new SkillService();
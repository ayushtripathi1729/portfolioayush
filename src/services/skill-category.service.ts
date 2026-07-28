import { Prisma } from "../../generated/prisma/client";

import { skillCategoryRepository } from "@/repositories/skill-category.repository";

export class SkillCategoryService {
  async getAll() {
    return skillCategoryRepository.findAll();
  }

  async getAllIncludingHidden() {
    return skillCategoryRepository.findAllIncludingHidden();
  }

  async getById(id: string) {
    return skillCategoryRepository.findById(id);
  }

  async getBySlug(slug: string) {
    return skillCategoryRepository.findBySlug(slug);
  }

  async create(data: Prisma.SkillCategoryCreateInput) {
    return skillCategoryRepository.create(data);
  }

  async update(
    id: string,
    data: Prisma.SkillCategoryUpdateInput
  ) {
    return skillCategoryRepository.update(id, data);
  }

  async delete(id: string) {
    return skillCategoryRepository.delete(id);
  }

  async count() {
    return skillCategoryRepository.count();
  }
}

export const skillCategoryService = new SkillCategoryService();
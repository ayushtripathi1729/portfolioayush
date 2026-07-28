import { Prisma } from "../../generated/prisma/client";

import { projectCategoryRepository } from "@/repositories/project-category.repository";

export class ProjectCategoryService {
  async getAll() {
    return projectCategoryRepository.findAll();
  }

  async getAllIncludingHidden() {
    return projectCategoryRepository.findAllIncludingHidden();
  }

  async getById(id: string) {
    return projectCategoryRepository.findById(id);
  }

  async getBySlug(slug: string) {
    return projectCategoryRepository.findBySlug(slug);
  }

  async create(data: Prisma.ProjectCategoryCreateInput) {
    return projectCategoryRepository.create(data);
  }

  async update(
    id: string,
    data: Prisma.ProjectCategoryUpdateInput
  ) {
    return projectCategoryRepository.update(id, data);
  }

  async delete(id: string) {
    return projectCategoryRepository.delete(id);
  }

  async count() {
    return projectCategoryRepository.count();
  }
}

export const projectCategoryService = new ProjectCategoryService();
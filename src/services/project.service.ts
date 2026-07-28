import { Prisma } from "../../generated/prisma/client";

import { projectRepository } from "@/repositories/project.repository";

export class ProjectService {
  async getAll() {
    return projectRepository.findAll();
  }

  async getPublished() {
    return projectRepository.findPublished();
  }

  async getById(id: string) {
    return projectRepository.findById(id);
  }

  async getBySlug(slug: string) {
    return projectRepository.findBySlug(slug);
  }

  async create(
    data:
      | Prisma.ProjectCreateInput
      | Prisma.ProjectUncheckedCreateInput
  ) {
    return projectRepository.create(data);
  }

  async update(
    id: string,
    data: Prisma.ProjectUpdateInput
  ) {
    return projectRepository.update(id, data);
  }

  async delete(id: string) {
    return projectRepository.delete(id);
  }

  async count() {
    return projectRepository.count();
  }
}

export const projectService = new ProjectService();
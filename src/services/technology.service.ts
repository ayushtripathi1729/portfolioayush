import { Prisma } from "../../generated/prisma/client";

import { technologyRepository } from "@/repositories/technology.repository";

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

  async getById(id: string) {
    return technologyRepository.findById(id);
  }

  async getBySlug(slug: string) {
    return technologyRepository.findBySlug(slug);
  }

  async create(data: Prisma.TechnologyCreateInput) {
    return technologyRepository.create(data);
  }

  async update(
    id: string,
    data: Prisma.TechnologyUpdateInput
  ) {
    return technologyRepository.update(id, data);
  }

  async delete(id: string) {
    return technologyRepository.delete(id);
  }

  async count() {
    return technologyRepository.count();
  }
}

export const technologyService = new TechnologyService();
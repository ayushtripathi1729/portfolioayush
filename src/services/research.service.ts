import { Prisma } from "../../generated/prisma/client";

import { researchRepository } from "@/repositories/research.repository";

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

  async getById(id: string) {
    return researchRepository.findById(id);
  }

  async getBySlug(slug: string) {
    return researchRepository.findBySlug(slug);
  }

  async create(data: Prisma.ResearchCreateInput) {
    return researchRepository.create(data);
  }

  async update(
    id: string,
    data: Prisma.ResearchUpdateInput
  ) {
    return researchRepository.update(id, data);
  }

  async delete(id: string) {
    return researchRepository.delete(id);
  }

  async count() {
    return researchRepository.count();
  }
}

export const researchService = new ResearchService();
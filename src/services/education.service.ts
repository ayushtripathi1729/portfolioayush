import { Prisma } from "../../generated/prisma/client";

import { educationRepository } from "@/repositories/education.repository";

export class EducationService {
  async getAll() {
    return educationRepository.findAll();
  }

  async getAllIncludingHidden() {
    return educationRepository.findAllIncludingHidden();
  }

  async getCurrent() {
    return educationRepository.findCurrent();
  }

  async getById(id: string) {
    return educationRepository.findById(id);
  }

  async create(data: Prisma.EducationCreateInput) {
    return educationRepository.create(data);
  }

  async update(
    id: string,
    data: Prisma.EducationUpdateInput
  ) {
    return educationRepository.update(id, data);
  }

  async delete(id: string) {
    return educationRepository.delete(id);
  }

  async count() {
    return educationRepository.count();
  }
}

export const educationService = new EducationService();
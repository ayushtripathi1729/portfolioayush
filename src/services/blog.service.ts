import { Prisma } from "../../generated/prisma/client";

import { blogRepository } from "@/repositories/blog.repository";

export class BlogService {
  async getAll() {
    return blogRepository.findAll();
  }

  async getPublished() {
    return blogRepository.findPublished();
  }

  async getFeatured() {
    return blogRepository.findFeatured();
  }

  async getById(id: string) {
    return blogRepository.findById(id);
  }

  async getBySlug(slug: string) {
    return blogRepository.findBySlug(slug);
  }

  async create(
    data:
      | Prisma.BlogCreateInput
      | Prisma.BlogUncheckedCreateInput
  ) {
    return blogRepository.create(data);
  }

  async update(
    id: string,
    data: Prisma.BlogUpdateInput
  ) {
    return blogRepository.update(id, data);
  }

  async delete(id: string) {
    return blogRepository.delete(id);
  }

  async count() {
    return blogRepository.count();
  }
}

export const blogService = new BlogService();
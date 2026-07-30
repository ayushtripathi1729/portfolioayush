import { prisma } from "@/lib/prisma";
import { Prisma } from "../../generated/prisma/client";

export class BlogRepository {
  async findAll() {
    return prisma.blog.findMany({
      include: {
        author: true,
        coverImage: true,
      },
      orderBy: [
        {
          displayOrder: "asc",
        },
        {
          publishedAt: "desc",
        },
      ],
    });
  }

  async findPublished() {
    return prisma.blog.findMany({
      where: {
        published: true,
        visible: true,
      },
      include: {
        author: true,
        coverImage: true,
      },
      orderBy: {
        publishedAt: "desc",
      },
    });
  }

  async findFeatured() {
    return prisma.blog.findMany({
      where: {
        featured: true,
        visible: true,
      },
      include: {
        author: true,
        coverImage: true,
      },
      orderBy: {
        displayOrder: "asc",
      },
    });
  }

  async findById(id: string) {
    return prisma.blog.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
        coverImage: true,
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.blog.findUnique({
      where: {
        slug,
      },
      include: {
        author: true,
        coverImage: true,
      },
    });
  }

  async create(
    data:
      | Prisma.BlogCreateInput
      | Prisma.BlogUncheckedCreateInput
  ) {
    return prisma.blog.create({
      data,
      include: {
        author: true,
        coverImage: true,
      },
    });
  }

  async update(
    id: string,
    data: Prisma.BlogUpdateInput
  ) {
    return prisma.blog.update({
      where: {
        id,
      },
      data,
      include: {
        author: true,
        coverImage: true,
      },
    });
  }

  async delete(id: string) {
    return prisma.blog.delete({
      where: {
        id,
      },
    });
  }

  async count() {
    return prisma.blog.count();
  }
}

export const blogRepository = new BlogRepository();
import { Prisma } from "../../generated/prisma/client";

import { blogRepository } from "@/repositories/blog.repository";
import { logActivity } from "@/lib/activity";



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





  async getById(
    id: string
  ) {

    return blogRepository.findById(
      id
    );

  }





  async getBySlug(
    slug: string
  ) {

    return blogRepository.findBySlug(
      slug
    );

  }





  async create(
    data:
      | Prisma.BlogCreateInput
      | Prisma.BlogUncheckedCreateInput
  ) {


    const blog =
      await blogRepository.create(
        data
      );



    await logActivity({

      action: "CREATE",

      entity: "Blog",

      entityId: blog.id,

      description:
        `Created blog "${blog.title}"`,

    });



    return blog;

  }








  async update(
    id: string,
    data: Prisma.BlogUncheckedUpdateInput
  ) {


    const blog =
      await blogRepository.update(
        id,
        data
      );



    await logActivity({

      action: "UPDATE",

      entity: "Blog",

      entityId: blog.id,

      description:
        `Updated blog "${blog.title}"`,

    });



    return blog;

  }








  async delete(
    id: string
  ) {


    const blog =
      await blogRepository.findById(
        id
      );



    const deleted =
      await blogRepository.delete(
        id
      );



    await logActivity({

      action: "DELETE",

      entity: "Blog",

      entityId: id,

      description:
        blog
          ? `Deleted blog "${blog.title}"`
          : "Deleted blog",

    });



    return deleted;

  }








  async count() {

    return blogRepository.count();

  }


}





export const blogService =
  new BlogService();

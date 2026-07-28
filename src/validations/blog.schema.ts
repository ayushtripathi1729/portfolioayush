import { z } from "zod";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const blogFields = {
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters.")
    .max(200, "Title cannot exceed 200 characters."),

  slug: z
    .string()
    .trim()
    .min(2, "Slug must be at least 2 characters.")
    .max(200, "Slug cannot exceed 200 characters.")
    .regex(
      slugRegex,
      "Slug must contain only lowercase letters, numbers, and hyphens."
    ),

  excerpt: z
    .string()
    .trim()
    .max(500, "Excerpt cannot exceed 500 characters.")
    .optional()
    .or(z.literal("")),

  content: z
    .string()
    .trim()
    .min(20, "Content must be at least 20 characters."),

  coverImageId: z
    .string()
    .optional()
    .or(z.literal("")),

  authorId: z
    .string()
    .min(1, "Author is required."),

  published: z.boolean().default(false),

  publishedAt: z.coerce.date().optional(),

  featured: z.boolean().default(false),

  visible: z.boolean().default(true),

  displayOrder: z
    .number()
    .int("Display order must be an integer.")
    .min(0, "Display order cannot be negative.")
    .default(0),
};


export const createBlogSchema = z
  .object(blogFields)
  .refine(
    (data) => {
      if (data.published) {
        return !!data.publishedAt;
      }

      return true;
    },
    {
      message:
        "Published blogs must have a publication date.",
      path: ["publishedAt"],
    }
  );


export const updateBlogSchema = z.object({
  title: blogFields.title.optional(),

  slug: blogFields.slug.optional(),

  excerpt: blogFields.excerpt,

  content: blogFields.content.optional(),

  coverImageId: blogFields.coverImageId,

  authorId: blogFields.authorId.optional(),

  published: blogFields.published.optional(),

  publishedAt: blogFields.publishedAt,

  featured: blogFields.featured.optional(),

  visible: blogFields.visible.optional(),

  displayOrder:
    blogFields.displayOrder.optional(),
});


export type CreateBlogInput = z.infer<
  typeof createBlogSchema
>;

export type UpdateBlogInput = z.infer<
  typeof updateBlogSchema
>;
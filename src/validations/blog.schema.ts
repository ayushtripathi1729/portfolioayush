import { z } from "zod";

import {
  optionalDate,
  optionalTrimmedString,
} from "@/validations/helpers";

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
    .transform((value) =>
      value === ""
        ? undefined
        : value
    ),

  content: z
    .string()
    .trim()
    .min(20, "Content must be at least 20 characters."),

  coverImageId: optionalTrimmedString(),

  authorId: z
    .string()
    .min(1, "Author is required."),

  published: z
    .boolean()
    .default(false),

  publishedAt: optionalDate,

  featured: z
    .boolean()
    .default(false),

  visible: z
    .boolean()
    .default(true),

  displayOrder: z
    .number()
    .int("Display order must be an integer.")
    .min(0, "Display order cannot be negative.")
    .default(0),
};

const blogFormFields = {
  title: blogFields.title,
  slug: blogFields.slug,
  excerpt: blogFields.excerpt,
  content: blogFields.content,
  coverImageId: blogFields.coverImageId,
  published: blogFields.published,
  publishedAt: blogFields.publishedAt,
  featured: blogFields.featured,
  visible: blogFields.visible,
  displayOrder: blogFields.displayOrder,
};

const requirePublishedDate = (data: {
  published?: boolean;
  publishedAt?: Date;
}) => {
  if (data.published) {
    return !!data.publishedAt;
  }

  return true;
};

export const createBlogFormSchema = z
  .object(blogFormFields)
  .refine(requirePublishedDate, {
    message:
      "Published blogs require a publication date.",
    path: ["publishedAt"],
  });

export const createBlogSchema = z
  .object(blogFields)
  .refine(requirePublishedDate, {
    message:
      "Published blogs require a publication date.",
    path: ["publishedAt"],
  });

export const updateBlogSchema = z
  .object({
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
    displayOrder: blogFields.displayOrder.optional(),
  })
  .refine(requirePublishedDate, {
    message:
      "Published blogs require a publication date.",
    path: ["publishedAt"],
  });

export type CreateBlogInput =
  z.input<typeof createBlogSchema>;

export type CreateBlogOutput =
  z.output<typeof createBlogSchema>;

export type CreateBlogFormInput =
  z.input<typeof createBlogFormSchema>;

export type CreateBlogFormOutput =
  z.output<typeof createBlogFormSchema>;

export type UpdateBlogInput =
  z.input<typeof updateBlogSchema>;

export type UpdateBlogOutput =
  z.output<typeof updateBlogSchema>;

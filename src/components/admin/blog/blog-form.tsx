"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  type FieldErrors,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import {
  createBlogFormSchema,
  type CreateBlogFormInput,
  type CreateBlogFormOutput,
} from "@/validations/blog.schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function BlogForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<
    CreateBlogFormInput,
    unknown,
    CreateBlogFormOutput
  >({
    resolver: zodResolver(createBlogFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      coverImageId: "",
      published: false,
      publishedAt: undefined,
      featured: false,
      visible: true,
      displayOrder: 0,
    },
  });

  async function onSubmit(values: CreateBlogFormOutput) {
    setServerError("");
    setSuccess("");

    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (!response.ok) {
        setServerError(
          result.message ??
          "Failed to create blog."
        );

        return;
      }

      setSuccess("Blog created successfully.");

      setTimeout(() => {
        router.push("/admin/blog");
        router.refresh();
      }, 1000);
    } catch (error) {
      console.error(error);
      setServerError("Something went wrong.");
    }
  }

  function onInvalid(
    formErrors: FieldErrors<CreateBlogFormInput>
  ) {
    const firstError =
      Object.values(formErrors)[0];

    setSuccess("");
    setServerError(
      firstError?.message?.toString() ??
      "Please fix the highlighted fields before creating the blog."
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className="space-y-6 rounded-xl border p-6"
      noValidate
    >
      <div className="space-y-2">
        <Label htmlFor="title">
          Title
        </Label>

        <Input
          id="title"
          {...register("title")}
          placeholder="Blog title"
        />

        {errors.title && (
          <p className="text-sm text-destructive">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">
          Slug
        </Label>

        <Input
          id="slug"
          {...register("slug")}
          placeholder="blog-title"
        />

        {errors.slug && (
          <p className="text-sm text-destructive">
            {errors.slug.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">
          Excerpt
        </Label>

        <Input
          id="excerpt"
          {...register("excerpt")}
          placeholder="Short description"
        />

        {errors.excerpt && (
          <p className="text-sm text-destructive">
            {errors.excerpt.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">
          Content
        </Label>

        <textarea
          id="content"
          {...register("content")}
          className="min-h-64 w-full rounded-lg border bg-transparent px-3 py-2 text-sm outline-none"
          placeholder="Write blog content..."
        />

        {errors.content && (
          <p className="text-sm text-destructive">
            {errors.content.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverImageId">
          Cover Image Asset ID
        </Label>

        <Input
          id="coverImageId"
          {...register("coverImageId")}
          placeholder="Optional Asset ID"
        />

        {errors.coverImageId && (
          <p className="text-sm text-destructive">
            {errors.coverImageId.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="publishedAt">
          Published Date
        </Label>

        <Input
          id="publishedAt"
          type="date"
          {...register("publishedAt", {
            valueAsDate: true,
          })}
        />

        {errors.publishedAt && (
          <p className="text-sm text-destructive">
            {errors.publishedAt.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="displayOrder">
          Display Order
        </Label>

        <Input
          id="displayOrder"
          type="number"
          {...register("displayOrder", {
            valueAsNumber: true,
          })}
        />

        {errors.displayOrder && (
          <p className="text-sm text-destructive">
            {errors.displayOrder.message}
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            {...register("published")}
          />
          Published
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            {...register("featured")}
          />
          Featured
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            {...register("visible")}
          />
          Visible
        </label>
      </div>

      {success && (
        <div className="rounded-md bg-green-500/10 p-3 text-sm text-green-600">
          {success}
        </div>
      )}

      {serverError && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {serverError}
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Creating...
          </>
        ) : (
          "Create Blog"
        )}
      </Button>
    </form>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import {
  createProjectSchema,
  type CreateProjectInput,
} from "@/validations/project.schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


interface ProjectCategory {
  id: string;
  name: string;
}


export function ProjectForm() {
  const router = useRouter();


  const [serverError, setServerError] =
    useState("");

  const [categories, setCategories] =
    useState<ProjectCategory[]>([]);

  const [loadingCategories, setLoadingCategories] =
    useState(true);



  useEffect(() => {

    async function loadCategories() {
      try {

        const response =
          await fetch(
            "/api/project-categories"
          );


        const result =
          await response.json();


        if (result.success) {
          setCategories(result.data);
        }

      } catch {

        setServerError(
          "Failed to load categories."
        );

      } finally {

        setLoadingCategories(false);

      }
    }


    loadCategories();

  }, []);




  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<CreateProjectInput>({
    resolver: zodResolver(
      createProjectSchema
    ),

    defaultValues: {
      title: "",
      slug: "",
      shortDescription: "",
      description: "",
      githubUrl: "",
      liveUrl: "",
      featured: false,
      visible: true,
      displayOrder: 0,
      status: "DRAFT",
      categoryId: "",
    },
  });




  async function onSubmit(
    values: CreateProjectInput
  ) {

    setServerError("");


    try {

      const response =
        await fetch(
          "/api/projects",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(values),
          }
        );



      const result =
        await response.json();



      if (!response.ok) {

        setServerError(
          result.message ??
          "Failed to create project."
        );

        return;

      }



      router.push(
        "/admin/projects"
      );

      router.refresh();



    } catch {

      setServerError(
        "Something went wrong."
      );

    }

  }




  return (
    <form
      onSubmit={
        handleSubmit(onSubmit)
      }
      className="space-y-6 rounded-xl border p-6"
    >


      <div className="space-y-2">

        <Label>
          Title
        </Label>

        <Input
          {...register("title")}
          placeholder="My Awesome Project"
        />

        {errors.title && (
          <p className="text-sm text-destructive">
            {errors.title.message}
          </p>
        )}

      </div>




      <div className="space-y-2">

        <Label>
          Slug
        </Label>

        <Input
          {...register("slug")}
          placeholder="my-awesome-project"
        />

        {errors.slug && (
          <p className="text-sm text-destructive">
            {errors.slug.message}
          </p>
        )}

      </div>




      <div className="space-y-2">

        <Label>
          Short Description
        </Label>

        <Input
          {...register(
            "shortDescription"
          )}
          placeholder="Short project summary"
        />

        {errors.shortDescription && (
          <p className="text-sm text-destructive">
            {
              errors.shortDescription.message
            }
          </p>
        )}

      </div>




      <div className="space-y-2">

        <Label>
          Description
        </Label>


        <textarea
          {...register("description")}
          className="min-h-40 w-full rounded-lg border bg-transparent px-3 py-2 text-sm outline-none"
          placeholder="Detailed project description..."
        />


        {errors.description && (
          <p className="text-sm text-destructive">
            {
              errors.description.message
            }
          </p>
        )}

      </div>




      <div className="grid gap-5 md:grid-cols-2">


        <div className="space-y-2">

          <Label>
            GitHub URL
          </Label>


          <Input
            {...register("githubUrl")}
            placeholder="https://github.com/..."
          />

        </div>




        <div className="space-y-2">

          <Label>
            Live URL
          </Label>


          <Input
            {...register("liveUrl")}
            placeholder="https://..."
          />

        </div>


      </div>





      <div className="space-y-2">

        <Label>
          Category
        </Label>


        <select
          {...register("categoryId")}
          disabled={
            loadingCategories
          }
          className="h-9 w-full rounded-lg border bg-transparent px-3 text-sm"
        >

          <option value="">
            Select category
          </option>


          {categories.map(
            (category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            )
          )}

        </select>


        {errors.categoryId && (
          <p className="text-sm text-destructive">
            {
              errors.categoryId.message
            }
          </p>
        )}

      </div>





      <div className="flex gap-6">


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





      {serverError && (

        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">

          {serverError}

        </div>

      )}






      <Button
        type="submit"
        disabled={
          isSubmitting
        }
      >

        {isSubmitting ? (

          <>

            <Loader2 className="size-4 animate-spin" />

            Creating...

          </>

        ) : (

          "Create Project"

        )}

      </Button>



    </form>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import {
  updateProjectSchema,
  type UpdateProjectInput,
} from "@/validations/project.schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


interface ProjectCategory {
  id: string;
  name: string;
}


interface EditProjectFormProps {
  project: {
    id: string;
    title: string;
    slug: string;
    shortDescription: string;
    description: string;
    githubUrl: string | null;
    liveUrl: string | null;
    featured: boolean;
    visible: boolean;
    status: "PUBLISHED" | "DRAFT" | "ARCHIVED";
    displayOrder: number;
    categoryId: string;
  };
}



export function EditProjectForm({
  project,
}: EditProjectFormProps) {

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

          setCategories(
            result.data
          );

        }

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
  } = useForm<UpdateProjectInput>({

    resolver:
      zodResolver(
        updateProjectSchema
      ),


    defaultValues: {

      title:
        project.title,

      slug:
        project.slug,

      shortDescription:
        project.shortDescription,

      description:
        project.description,

      githubUrl:
        project.githubUrl ?? "",

      liveUrl:
        project.liveUrl ?? "",

      featured:
        project.featured,

      visible:
        project.visible,

      status:
        project.status,

      displayOrder:
        project.displayOrder,

      categoryId:
        project.categoryId,

    },

  });





  async function onSubmit(
    values: UpdateProjectInput
  ) {

    setServerError("");


    try {

      const response =
        await fetch(
          `/api/projects/${project.id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(values),
          }
        );



      const result =
        await response.json();



      if (!response.ok) {

        setServerError(
          result.message ??
          "Failed to update project."
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
        />


      </div>





      <div className="space-y-2">

        <Label>
          Description
        </Label>


        <textarea
          {...register("description")}
          className="min-h-40 w-full rounded-lg border bg-transparent px-3 py-2 text-sm"
        />


      </div>





      <div className="grid gap-5 md:grid-cols-2">


        <div className="space-y-2">

          <Label>
            GitHub URL
          </Label>


          <Input
            {...register("githubUrl")}
          />

        </div>



        <div className="space-y-2">

          <Label>
            Live URL
          </Label>


          <Input
            {...register("liveUrl")}
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

      </div>





      <div className="space-y-2">

        <Label>
          Status
        </Label>


        <select
          {...register("status")}
          className="h-9 w-full rounded-lg border bg-transparent px-3 text-sm"
        >

          <option value="DRAFT">
            Draft
          </option>

          <option value="PUBLISHED">
            Published
          </option>

          <option value="ARCHIVED">
            Archived
          </option>

        </select>


      </div>



      <div className="space-y-2">

        <Label>
          Display Order
        </Label>

        <Input
          type="number"
          {...register("displayOrder", { valueAsNumber: true })}
        />

        {errors.displayOrder && (
          <p className="text-sm text-destructive">
            {errors.displayOrder.message}
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

            Saving...

          </>

        ) : (

          "Save Changes"

        )}

      </Button>



    </form>

  );
}

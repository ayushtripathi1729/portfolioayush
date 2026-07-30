"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import {
  updateSkillCategorySchema,
  type UpdateSkillCategoryInput,
} from "@/validations/skill-category.schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


interface EditSkillCategoryFormProps {
  category: {
    id: string;
    name: string;
    slug: string;
    description: string;
    displayOrder: number;
    visible: boolean;
  };
}



export function EditSkillCategoryForm({
  category,
}: EditSkillCategoryFormProps) {

  const router = useRouter();


  const [serverError, setServerError] =
    useState("");





  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<UpdateSkillCategoryInput>({

    resolver:
      zodResolver(
        updateSkillCategorySchema
      ),


    defaultValues: {

      name:
        category.name,


      slug:
        category.slug,


      description:
        category.description,


      displayOrder:
        category.displayOrder,


      visible:
        category.visible,

    },

  });







  async function onSubmit(
    values: UpdateSkillCategoryInput
  ) {

    setServerError("");



    try {

      const response =
        await fetch(
          `/api/skill-categories/${category.id}`,
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
          "Failed to update category."
        );

        return;

      }




      router.push(
        "/admin/skill-categories"
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
          Category Name
        </Label>


        <Input
          {...register("name")}
        />


        {errors.name && (

          <p className="text-sm text-destructive">
            {errors.name.message}
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
          Description
        </Label>


        <textarea

          {...register("description")}

          className="min-h-32 w-full rounded-lg border bg-transparent px-3 py-2 text-sm outline-none"

          placeholder="Category description"

        />



        {errors.description && (

          <p className="text-sm text-destructive">
            {errors.description.message}
          </p>

        )}

      </div>








      <div className="space-y-2">

        <Label>
          Display Order
        </Label>


        <Input

          type="number"

          {...register(
            "displayOrder",
            {
              valueAsNumber: true,
            }
          )}

        />



        {errors.displayOrder && (

          <p className="text-sm text-destructive">
            {errors.displayOrder.message}
          </p>

        )}

      </div>








      <label className="flex items-center gap-2 text-sm">

        <input

          type="checkbox"

          {...register("visible")}

        />


        Visible


      </label>








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
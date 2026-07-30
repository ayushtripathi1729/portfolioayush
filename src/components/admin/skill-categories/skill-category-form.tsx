"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import {
  createSkillCategorySchema,
  type CreateSkillCategoryInput,
} from "@/validations/skill-category.schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export function SkillCategoryForm() {

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
  } = useForm<CreateSkillCategoryInput>({

    resolver:
      zodResolver(
        createSkillCategorySchema
      ),


    defaultValues: {

      name: "",

      slug: "",

      displayOrder: 0,

      visible: true,

    },

  });







  async function onSubmit(
    values: CreateSkillCategoryInput
  ) {

    setServerError("");



    try {

      const response =
        await fetch(
          "/api/skill-categories",
          {
            method: "POST",

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
          "Failed to create category."
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
          placeholder="Frontend Development"
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
          placeholder="frontend-development"
        />


        {errors.slug && (

          <p className="text-sm text-destructive">
            {errors.slug.message}
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
        disabled={isSubmitting}
      >

        {isSubmitting ? (

          <>

            <Loader2 className="size-4 animate-spin" />

            Creating...

          </>

        ) : (

          "Create Category"

        )}

      </Button>



    </form>

  );
}
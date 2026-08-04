"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import {
  createAchievementSchema,
  type CreateAchievementInput,
} from "@/validations/achievement.schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export function AchievementForm() {

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
  } = useForm<CreateAchievementInput>({

    resolver:
      zodResolver(
        createAchievementSchema
      ),

    defaultValues: {

      title: "",

      description: "",

      category: "",

      issuer: "",

      issueDate: undefined,

      credentialUrl: "",

      imageId: "",

      displayOrder: 0,

      visible: true,

      featured: false,

    },

  });





  async function onSubmit(
    values: CreateAchievementInput
  ) {

    setServerError("");

    try {

      const response =
        await fetch(
          "/api/achievement",
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
          "Failed to create achievement."
        );

        return;

      }



      router.push(
        "/admin/achievement"
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


      <div className="grid gap-6 md:grid-cols-2">


        <div className="space-y-2">

          <Label>
            Title
          </Label>


          <Input
            {...register("title")}
            placeholder="Achievement title"
          />


          {errors.title && (
            <p className="text-sm text-destructive">
              {errors.title.message}
            </p>
          )}

        </div>



        <div className="space-y-2">

          <Label>
            Category
          </Label>


          <Input
            {...register("category")}
            placeholder="Certification, Award, Competition"
          />

        </div>



        <div className="space-y-2">

          <Label>
            Issuer
          </Label>


          <Input
            {...register("issuer")}
            placeholder="Organization name"
          />

        </div>



        <div className="space-y-2">

          <Label>
            Issue Date
          </Label>


          <Input
            type="date"
            {...register(
              "issueDate",
              {
                valueAsDate: true,
              }
            )}
          />

        </div>


      </div>





      <div className="space-y-2">

        <Label>
          Description
        </Label>


        <textarea
          {...register("description")}
          className="min-h-40 w-full rounded-lg border bg-transparent px-3 py-2 text-sm"
          placeholder="Achievement details..."
        />


      </div>





      <div className="space-y-2">

        <Label>
          Credential URL
        </Label>


        <Input
          {...register("credentialUrl")}
          placeholder="https://..."
        />

      </div>





      <div className="space-y-2">

        <Label>
          Image Asset ID
        </Label>


        <Input
          {...register("imageId")}
          placeholder="Asset ID"
        />

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
        disabled={isSubmitting}
      >

        {isSubmitting ? (

          <>
            <Loader2 className="size-4 animate-spin" />
            Creating...
          </>

        ) : (

          "Create Achievement"

        )}

      </Button>


    </form>
  );
}

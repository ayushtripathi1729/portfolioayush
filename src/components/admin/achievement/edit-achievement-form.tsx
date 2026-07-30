"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import {
  updateAchievementSchema,
  type UpdateAchievementInput,
} from "@/validations/achievement.schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


interface EditAchievementFormProps {
  achievement: {
    id: string;
    title: string;
    description: string;
    category: string;
    issuer: string;
    issueDate: Date | null;
    credentialUrl: string;
    imageId: string;
    displayOrder: number;
    visible: boolean;
  };
}



export function EditAchievementForm({
  achievement,
}: EditAchievementFormProps) {


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
  } = useForm<UpdateAchievementInput>({

    resolver:
      zodResolver(
        updateAchievementSchema
      ),


    defaultValues: {

      title:
        achievement.title,

      description:
        achievement.description,

      category:
        achievement.category,

      issuer:
        achievement.issuer,

      issueDate:
        achievement.issueDate ?? undefined,

      credentialUrl:
        achievement.credentialUrl,

      imageId:
        achievement.imageId,

      displayOrder:
        achievement.displayOrder,

      visible:
        achievement.visible,

    },

  });





  async function onSubmit(
    values: UpdateAchievementInput
  ) {


    setServerError("");



    try {


      const response =
        await fetch(
          `/api/achievement/${achievement.id}`,
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
          "Failed to update achievement."
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
          />

        </div>




        <div className="space-y-2">

          <Label>
            Issuer
          </Label>


          <Input
            {...register("issuer")}
          />

        </div>




        <div className="space-y-2">

          <Label>
            Issue Date
          </Label>


          <Input
            type="date"
            defaultValue={
              achievement.issueDate
                ? achievement.issueDate
                    .toISOString()
                    .split("T")[0]
                : ""
            }
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
        />

      </div>





      <div className="space-y-2">

        <Label>
          Credential URL
        </Label>


        <Input
          {...register("credentialUrl")}
        />

      </div>





      <div className="space-y-2">

        <Label>
          Image Asset ID
        </Label>


        <Input
          {...register("imageId")}
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
            Saving...
          </>

        ) : (

          "Save Changes"

        )}

      </Button>


    </form>

  );
}
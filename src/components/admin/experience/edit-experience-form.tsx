"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useForm,
  useWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import {
  updateExperienceSchema,
  type UpdateExperienceInput,
} from "@/validations/experience.schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


interface EditExperienceFormProps {
  experience: {
    id: string;
    company: string;
    position: string;
    employmentType: string;
    location: string;
    startDate: Date;
    endDate: Date | null;
    isCurrent: boolean;
    description: string;
    companyLogoId: string;
    displayOrder: number;
    visible: boolean;
  };
}



export function EditExperienceForm({
  experience,
}: EditExperienceFormProps) {

  const router = useRouter();


  const [serverError, setServerError] =
    useState("");



  const {
    register,
    handleSubmit,
    control,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<UpdateExperienceInput>({

    resolver:
      zodResolver(
        updateExperienceSchema
      ),


    defaultValues: {

      company:
        experience.company,

      position:
        experience.position,

      employmentType:
        experience.employmentType,

      location:
        experience.location,

      startDate:
        experience.startDate,

      endDate:
        experience.endDate ?? undefined,

      isCurrent:
        experience.isCurrent,

      description:
        experience.description,

      companyLogoId:
        experience.companyLogoId,

      displayOrder:
        experience.displayOrder,

      visible:
        experience.visible,

    },

  });




  const isCurrent =
    useWatch({
      control,
      name: "isCurrent",
    });







  async function onSubmit(
    values: UpdateExperienceInput
  ) {

    setServerError("");



    try {

      const response =
        await fetch(
          `/api/experience/${experience.id}`,
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
          "Failed to update experience."
        );

        return;

      }




      router.push(
        "/admin/experience"
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
            Company
          </Label>


          <Input
            {...register("company")}
          />


          {errors.company && (

            <p className="text-sm text-destructive">
              {errors.company.message}
            </p>

          )}

        </div>





        <div className="space-y-2">

          <Label>
            Position
          </Label>


          <Input
            {...register("position")}
          />


          {errors.position && (

            <p className="text-sm text-destructive">
              {errors.position.message}
            </p>

          )}

        </div>


      </div>







      <div className="grid gap-6 md:grid-cols-2">


        <div className="space-y-2">

          <Label>
            Employment Type
          </Label>


          <Input
            {...register("employmentType")}
          />

        </div>





        <div className="space-y-2">

          <Label>
            Location
          </Label>


          <Input
            {...register("location")}
          />

        </div>


      </div>







      <div className="grid gap-6 md:grid-cols-2">


        <div className="space-y-2">

          <Label>
            Start Date
          </Label>


          <Input
            type="date"
            defaultValue={
              experience.startDate
                .toISOString()
                .split("T")[0]
            }
            {...register(
              "startDate",
              {
                valueAsDate: true,
              }
            )}
          />


        </div>





        {!isCurrent && (

          <div className="space-y-2">

            <Label>
              End Date
            </Label>


            <Input
              type="date"
              defaultValue={
                experience.endDate
                  ? experience.endDate
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              {...register(
                "endDate",
                {
                  valueAsDate: true,
                }
              )}
            />


            {errors.endDate && (

              <p className="text-sm text-destructive">
                {errors.endDate.message}
              </p>

            )}

          </div>

        )}


      </div>







      <div className="space-y-2">

        <Label>
          Description
        </Label>


        <textarea
          {...register("description")}
          className="min-h-40 w-full rounded-lg border bg-transparent px-3 py-2 text-sm outline-none"
        />


        {errors.description && (

          <p className="text-sm text-destructive">
            {errors.description.message}
          </p>

        )}

      </div>







      <div className="space-y-2">

        <Label>
          Company Logo Asset ID
        </Label>


        <Input
          {...register("companyLogoId")}
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
            {...register("isCurrent")}
          />

          Current Position

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

            Saving...

          </>

        ) : (

          "Save Changes"

        )}

      </Button>


    </form>
  );
}
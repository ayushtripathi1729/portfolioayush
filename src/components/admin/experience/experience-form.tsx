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
  createExperienceSchema,
  type CreateExperienceInput,
} from "@/validations/experience.schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export function ExperienceForm() {

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
  } = useForm<CreateExperienceInput>({

    resolver:
      zodResolver(
        createExperienceSchema
      ),


    defaultValues: {

      company: "",

      position: "",

      employmentType: "",

      location: "",

      isCurrent: false,

      description: "",

      companyLogoId: "",

      displayOrder: 0,

      visible: true,

      featured: false,

    },

  });




  const isCurrent =
    useWatch({
      control,
      name: "isCurrent",
    });







  async function onSubmit(
    values: CreateExperienceInput
  ) {

    setServerError("");



    try {

      const response =
        await fetch(
          "/api/experience",
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
          "Failed to create experience."
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
            placeholder="Google"
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
            placeholder="Software Engineer"
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
            placeholder="Internship"
          />

        </div>





        <div className="space-y-2">

          <Label>
            Location
          </Label>


          <Input
            {...register("location")}
            placeholder="Remote"
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
            {...register(
              "startDate",
              {
                valueAsDate: true,
              }
            )}
          />


          {errors.startDate && (

            <p className="text-sm text-destructive">
              {errors.startDate.message}
            </p>

          )}

        </div>





        {!isCurrent && (

          <div className="space-y-2">

            <Label>
              End Date
            </Label>


            <Input
              type="date"
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

          placeholder="Describe your responsibilities and achievements..."

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

            Creating...

          </>

        ) : (

          "Create Experience"

        )}

      </Button>


    </form>
  );
}

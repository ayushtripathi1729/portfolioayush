"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import {
  createEducationSchema,
  type CreateEducationInput,
} from "@/validations/education.schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export function EducationForm() {

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
  } = useForm<
    CreateEducationInput,
    unknown,
    CreateEducationInput
  >({

    resolver:
      zodResolver(
        createEducationSchema
      ),

    defaultValues: {

      institution: "",

      degree: "",

      branch: "",

      location: "",

      startDate: undefined,

      endDate: undefined,

      isCurrent: false,

      gradeValue: 0,

      description: "",

      institutionLogoId: "",

      displayOrder: 0,

      visible: true,

    },

  });





  async function onSubmit(
    values: CreateEducationInput
  ) {

    setServerError("");

    try {

      const response =
        await fetch(
          "/api/education",
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
          "Failed to create education."
        );

        return;

      }



      router.push(
        "/admin/education"
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
            Institution
          </Label>


          <Input
            {...register("institution")}
            placeholder="University name"
          />


          {errors.institution && (
            <p className="text-sm text-destructive">
              {errors.institution.message}
            </p>
          )}

        </div>



        <div className="space-y-2">

          <Label>
            Degree
          </Label>


          <Input
            {...register("degree")}
            placeholder="B.Tech Computer Science"
          />


          {errors.degree && (
            <p className="text-sm text-destructive">
              {errors.degree.message}
            </p>
          )}

        </div>



        <div className="space-y-2">

          <Label>
            Branch
          </Label>


          <Input
            {...register("branch")}
            placeholder="Computer Science"
          />

        </div>



        <div className="space-y-2">

          <Label>
            Location
          </Label>


          <Input
            {...register("location")}
            placeholder="City, Country"
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

        </div>


      </div>





      <div className="space-y-2">

        <Label>
          Grade Type
        </Label>


        <select
          {...register("gradeType")}
          className="w-full rounded-lg border bg-transparent px-3 py-2 text-sm"
        >

          <option value="">
            Select grade type
          </option>

          <option value="CGPA">
            CGPA
          </option>

          <option value="PERCENTAGE">
            Percentage
          </option>

        </select>


        {errors.gradeType && (
          <p className="text-sm text-destructive">
            {errors.gradeType.message}
          </p>
        )}

      </div>





      <div className="space-y-2">

        <Label>
          Grade Value
        </Label>


        <Input
          type="number"
          step="0.01"
          {...register(
            "gradeValue",
            {
              valueAsNumber: true,
            }
          )}
        />


        {errors.gradeValue && (
          <p className="text-sm text-destructive">
            {errors.gradeValue.message}
          </p>
        )}

      </div>





      <div className="space-y-2">

        <Label>
          Description
        </Label>


        <textarea
          {...register("description")}
          className="min-h-40 w-full rounded-lg border bg-transparent px-3 py-2 text-sm"
          placeholder="Education details..."
        />

      </div>





      <div className="space-y-2">

        <Label>
          Institution Logo Asset ID
        </Label>


        <Input
          {...register("institutionLogoId")}
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





      <div className="flex flex-wrap gap-6">

        <label className="flex items-center gap-2 text-sm">

          <input
            type="checkbox"
            {...register("isCurrent")}
          />

          Current Education

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

          "Create Education"

        )}

      </Button>


    </form>
  );
}
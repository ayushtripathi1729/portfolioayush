"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useForm,
  useWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { z } from "zod";

import {
  updateEducationSchema,
  type UpdateEducationInput,
} from "@/validations/education.schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


interface EditEducationFormProps {

  education: {

    id: string;

    institution: string;

    degree: string;

    branch: string;

    location: string;

    startDate: Date;

    endDate: Date | null;

    isCurrent: boolean;

    gradeType: string;

    gradeValue: number | string;

    description: string;

    institutionLogoId: string;

    displayOrder: number;

    visible: boolean;

  };

}



export function EditEducationForm({
  education,
}: EditEducationFormProps) {


  const router = useRouter();


  const [serverError, setServerError] =
    useState("");



  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: {
      errors,
      isSubmitting,
    },

  } = useForm<
    z.input<typeof updateEducationSchema>,
    unknown,
    UpdateEducationInput
  >({

    resolver:
      zodResolver(
        updateEducationSchema
      ),


    defaultValues: {


      institution:
        education.institution,


      degree:
        education.degree,


      branch:
        education.branch,


      location:
        education.location,


      startDate:
        education.startDate,


      endDate:
        education.isCurrent
          ? undefined
          : education.endDate ?? undefined,


      isCurrent:
        education.isCurrent,


      gradeType:
        education.gradeType as UpdateEducationInput["gradeType"],


      gradeValue:
        Number(education.gradeValue),


      description:
        education.description,


      institutionLogoId:
        education.institutionLogoId,


      displayOrder:
        education.displayOrder,


      visible:
        education.visible,


    },

  });



  const isCurrent =
    useWatch({
      control,
      name: "isCurrent",
    });




  async function onSubmit(
    values: UpdateEducationInput
  ) {


    setServerError("");



    const payload = {


      ...values,


      endDate:
        values.isCurrent
          ? null
          : values.endDate,


    };



    try {


      const response =
        await fetch(
          `/api/education/${education.id}`,
          {

            method: "PUT",


            headers: {

              "Content-Type":
                "application/json",

            },


            body:
              JSON.stringify(payload),


          }
        );




      const result =
        await response.json();




      if (!response.ok) {


        setServerError(
          result.message ??
          "Failed to update education."
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

            {...register(
              "institution"
            )}

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

            {...register(
              "degree"
            )}

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

            {...register(
              "branch"
            )}

          />


        </div>





        <div className="space-y-2">


          <Label>
            Location
          </Label>


          <Input

            {...register(
              "location"
            )}

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
              education.startDate
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





        <div className="space-y-2">


          <Label>
            End Date
          </Label>


          <Input


            type="date"


            disabled={
              isCurrent
            }


            defaultValue={

              education.endDate
                ? education.endDate
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


      </div>






      <div className="space-y-2">


        <Label>
          Grade Type
        </Label>



        <select

          {...register(
            "gradeType"
          )}

          className="w-full rounded-lg border bg-transparent px-3 py-2 text-sm"

        >


          <option value="CGPA">
            CGPA
          </option>


          <option value="PERCENTAGE">
            Percentage
          </option>


        </select>


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

          {...register(
            "description"
          )}

          className="min-h-40 w-full rounded-lg border bg-transparent px-3 py-2 text-sm"

        />


      </div>







      <div className="space-y-2">


        <Label>
          Institution Logo Asset ID
        </Label>


        <Input

          {...register(
            "institutionLogoId"
          )}

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


            {...register(
              "isCurrent"
            )}


            onChange={(event)=>{


              const checked =
                event.target.checked;



              setValue(
                "isCurrent",
                checked
              );



              if(checked){


                setValue(
                  "endDate",
                  null
                );


              }


            }}


          />


          Current Education


        </label>






        <label className="flex items-center gap-2 text-sm">


          <input

            type="checkbox"


            {...register(
              "visible"
            )}

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
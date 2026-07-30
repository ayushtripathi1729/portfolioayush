"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import {
  updateResearchSchema,
  type UpdateResearchInput,
} from "@/validations/research.schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


interface EditResearchFormProps {
  research: {
    id: string;
    title: string;
    slug: string;
    abstract: string;
    publisher: string;
    journal: string;
    doi: string;
    externalUrl: string;
    publishedAt: Date | null;
    pdfAssetId: string;
    coverImageId: string;
    featured: boolean;
    visible: boolean;
    displayOrder: number;
  };
}



export function EditResearchForm({
  research,
}: EditResearchFormProps) {

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
  } = useForm<UpdateResearchInput>({

    resolver:
      zodResolver(
        updateResearchSchema
      ),


    defaultValues: {

      title:
        research.title,

      slug:
        research.slug,

      abstract:
        research.abstract,

      publisher:
        research.publisher,

      journal:
        research.journal,

      doi:
        research.doi,

      externalUrl:
        research.externalUrl,

      publishedAt:
        research.publishedAt ?? undefined,

      pdfAssetId:
        research.pdfAssetId,

      coverImageId:
        research.coverImageId,

      featured:
        research.featured,

      visible:
        research.visible,

      displayOrder:
        research.displayOrder,

    },

  });








  async function onSubmit(
    values: UpdateResearchInput
  ) {

    setServerError("");



    try {

      const response =
        await fetch(
          `/api/research/${research.id}`,
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
          "Failed to update research."
        );

        return;

      }




      router.push(
        "/admin/research"
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
          Abstract
        </Label>


        <textarea

          {...register("abstract")}

          className="min-h-40 w-full rounded-lg border bg-transparent px-3 py-2 text-sm outline-none"

        />



      </div>








      <div className="grid gap-6 md:grid-cols-2">


        <div className="space-y-2">


          <Label>
            Publisher
          </Label>


          <Input
            {...register("publisher")}
          />


        </div>





        <div className="space-y-2">


          <Label>
            Journal / Conference
          </Label>


          <Input
            {...register("journal")}
          />


        </div>


      </div>








      <div className="grid gap-6 md:grid-cols-2">


        <div className="space-y-2">


          <Label>
            DOI
          </Label>


          <Input
            {...register("doi")}
          />


        </div>





        <div className="space-y-2">


          <Label>
            External URL
          </Label>


          <Input
            {...register("externalUrl")}
          />


        </div>


      </div>








      <div className="space-y-2">


        <Label>
          Published Date
        </Label>


        <Input

          type="date"

          defaultValue={
            research.publishedAt
              ? research.publishedAt
                  .toISOString()
                  .split("T")[0]
              : ""
          }

          {...register(
            "publishedAt",
            {
              valueAsDate: true,
            }
          )}

        />


      </div>








      <div className="grid gap-6 md:grid-cols-2">


        <div className="space-y-2">


          <Label>
            PDF Asset ID
          </Label>


          <Input
            {...register("pdfAssetId")}
          />


        </div>





        <div className="space-y-2">


          <Label>
            Cover Image Asset ID
          </Label>


          <Input
            {...register("coverImageId")}
          />


        </div>


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

            Saving...

          </>

        ) : (

          "Save Changes"

        )}

      </Button>


    </form>
  );
}
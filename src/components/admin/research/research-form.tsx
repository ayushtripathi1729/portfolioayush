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
  createResearchSchema,
  type CreateResearchInput,
} from "@/validations/research.schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export function ResearchForm() {

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
  } = useForm<CreateResearchInput>({

    resolver:
      zodResolver(
        createResearchSchema
      ),


    defaultValues: {

      title: "",

      slug: "",

      abstract: "",

      publisher: "",

      journal: "",

      doi: "",

      externalUrl: "",

      pdfAssetId: "",

      coverImageId: "",

      featured: false,

      visible: true,

      displayOrder: 0,

    },

  });





  const featured =
    useWatch({
      control,
      name: "featured",
    });







  async function onSubmit(
    values: CreateResearchInput
  ) {

    setServerError("");



    try {

      const response =
        await fetch(
          "/api/research",
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
          "Failed to create research."
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



      <div className="grid gap-6 md:grid-cols-2">


        <div className="space-y-2 md:col-span-2">

          <Label>
            Title
          </Label>


          <Input
            {...register("title")}
            placeholder="Research Paper Title"
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
            placeholder="research-paper-title"
          />


          {errors.slug && (

            <p className="text-sm text-destructive">
              {errors.slug.message}
            </p>

          )}

        </div>





        <div className="space-y-2">

          <Label>
            DOI
          </Label>


          <Input
            {...register("doi")}
            placeholder="10.xxxx/xxxxx"
          />

        </div>


      </div>







      <div className="space-y-2">

        <Label>
          Abstract
        </Label>


        <textarea
          {...register("abstract")}
          className="min-h-40 w-full rounded-lg border bg-transparent px-3 py-2 text-sm outline-none"
          placeholder="Research abstract..."
        />


        {errors.abstract && (

          <p className="text-sm text-destructive">
            {errors.abstract.message}
          </p>

        )}

      </div>







      <div className="grid gap-6 md:grid-cols-2">


        <div className="space-y-2">

          <Label>
            Publisher
          </Label>


          <Input
            {...register("publisher")}
            placeholder="IEEE"
          />

        </div>





        <div className="space-y-2">

          <Label>
            Journal / Conference
          </Label>


          <Input
            {...register("journal")}
            placeholder="Journal name"
          />

        </div>


      </div>







      <div className="space-y-2">

        <Label>
          External URL
        </Label>


        <Input
          {...register("externalUrl")}
          placeholder="https://..."
        />


        {errors.externalUrl && (

          <p className="text-sm text-destructive">
            {errors.externalUrl.message}
          </p>

        )}

      </div>







      <div className="space-y-2">

        <Label>
          Published Date
        </Label>


        <Input
          type="date"
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
            placeholder="Asset ID"
          />

        </div>





        <div className="space-y-2">

          <Label>
            Cover Image Asset ID
          </Label>


          <Input
            {...register("coverImageId")}
            placeholder="Asset ID"
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
        disabled={isSubmitting}
      >

        {isSubmitting ? (

          <>

            <Loader2 className="size-4 animate-spin" />

            Creating...

          </>

        ) : (

          "Create Research"

        )}

      </Button>


    </form>
  );
}
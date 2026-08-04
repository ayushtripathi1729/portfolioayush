"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import {
  createAssetSchema,
  type CreateAssetInput,
} from "@/validations/asset.schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";



export function AssetForm() {

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
  } = useForm<CreateAssetInput>({

    resolver:
      zodResolver(
        createAssetSchema
      ),

    defaultValues: {

      fileName: "",

      originalName: "",

      url: "",

      mimeType: "",

      type: undefined,

      extension: "",

      size: 0,

      width: undefined,

      height: undefined,

      altText: "",

    },

  });





  async function onSubmit(
    values: CreateAssetInput
  ) {

    setServerError("");

    try {

      const response =
        await fetch(
          "/api/assets",
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
          "Failed to create asset."
        );

        return;

      }



      router.push(
        "/admin/assets"
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
            File Name
          </Label>

          <Input
            {...register("fileName")}
          />

          {errors.fileName && (
            <p className="text-sm text-destructive">
              {errors.fileName.message}
            </p>
          )}

        </div>




        <div className="space-y-2">

          <Label>
            Original Name
          </Label>

          <Input
            {...register("originalName")}
          />

        </div>




        <div className="space-y-2">

          <Label>
            URL
          </Label>

          <Input
            {...register("url")}
          />

          {errors.url && (
            <p className="text-sm text-destructive">
              {errors.url.message}
            </p>
          )}

        </div>




        <div className="space-y-2">

          <Label>
            MIME Type
          </Label>

          <Input
            {...register("mimeType")}
          />

        </div>




        <div className="space-y-2">

          <Label>
            Asset Type
          </Label>

          <select
            {...register("type")}
            className="w-full rounded-lg border bg-transparent px-3 py-2 text-sm"
          >

            <option value="">
              Select type
            </option>

            <option value="IMAGE">
              Image
            </option>

            <option value="DOCUMENT">
              Document
            </option>

            <option value="PDF">
              PDF
            </option>

            <option value="AUDIO">
              Audio
            </option>

            <option value="VIDEO">
              Video
            </option>

            <option value="OTHER">
              Other
            </option>

          </select>


        </div>




        <div className="space-y-2">

          <Label>
            Extension
          </Label>

          <Input
            {...register("extension")}
          />

        </div>




        <div className="space-y-2">

          <Label>
            Size (bytes)
          </Label>

          <Input
            type="number"
            {...register(
              "size",
              {
                valueAsNumber: true,
              }
            )}
          />

        </div>




        <div className="space-y-2">

          <Label>
            Width
          </Label>

          <Input
            type="number"
            {...register(
              "width",
              {
                valueAsNumber: true,
              }
            )}
          />

        </div>




        <div className="space-y-2">

          <Label>
            Height
          </Label>

          <Input
            type="number"
            {...register(
              "height",
              {
                valueAsNumber: true,
              }
            )}
          />

        </div>


      </div>





      <div className="space-y-2">

        <Label>
          Alt Text
        </Label>

        <Input
          {...register("altText")}
        />

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

          "Create Asset"

        )}

      </Button>


    </form>
  );
}

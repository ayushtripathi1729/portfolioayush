"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import {
  updateAssetSchema,
  type UpdateAssetInput,
} from "@/validations/asset.schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


interface EditAssetFormProps {
  asset: {
    id: string;
    fileName: string;
    originalName: string;
    url: string;
    mimeType: string;
    type: string;
    extension: string;
    size: number;
    width: number | null;
    height: number | null;
    altText: string;
  };
}



export function EditAssetForm({
  asset,
}: EditAssetFormProps) {

  const router = useRouter();

  const [serverError, setServerError] =
    useState("");



  const {
    register,
    handleSubmit,
    formState: {
      isSubmitting,
    },
  } = useForm<
    UpdateAssetInput
  >({

    resolver:
      zodResolver(
        updateAssetSchema
      ),

    defaultValues: {

      fileName:
        asset.fileName,

      originalName:
        asset.originalName,

      url:
        asset.url,

      mimeType:
        asset.mimeType,

      type:
        asset.type as UpdateAssetInput["type"],

      extension:
        asset.extension,

      size:
        asset.size,

      width:
        asset.width ?? undefined,

      height:
        asset.height ?? undefined,

      altText:
        asset.altText,

    },

  });





  async function onSubmit(
    values: UpdateAssetInput
  ) {

    setServerError("");

    try {

      const response =
        await fetch(
          `/api/assets/${asset.id}`,
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
          "Failed to update asset."
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
            Saving...
          </>

        ) : (

          "Save Changes"

        )}

      </Button>


    </form>
  );
}
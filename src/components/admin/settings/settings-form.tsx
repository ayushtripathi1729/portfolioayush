"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import {
  updateSettingSchema,
  type UpdateSettingInput,
} from "@/validations/settings.schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


interface SettingsFormProps {
  settings: {
    siteTitle: string;
    siteDescription: string;
    fullName: string;
    tagline: string;
    bio: string;
    email: string;
    phone: string;
    location: string;
    profileImageId: string;
    resumeAssetId: string;
  };
}



export function SettingsForm({
  settings,
}: SettingsFormProps) {

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
  } = useForm<UpdateSettingInput>({

    resolver:
      zodResolver(
        updateSettingSchema
      ),

    defaultValues: {

      siteTitle:
        settings.siteTitle,

      siteDescription:
        settings.siteDescription,

      fullName:
        settings.fullName,

      tagline:
        settings.tagline,

      bio:
        settings.bio,

      email:
        settings.email,

      phone:
        settings.phone,

      location:
        settings.location,

      profileImageId:
        settings.profileImageId,

      resumeAssetId:
        settings.resumeAssetId,

    },

  });





  async function onSubmit(
    values: UpdateSettingInput
  ) {

    setServerError("");

    try {

      const response =
        await fetch(
          "/api/settings",
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
          "Failed to update settings."
        );

        return;

      }



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
            Site Title
          </Label>

          <Input
            {...register("siteTitle")}
          />

          {errors.siteTitle && (
            <p className="text-sm text-destructive">
              {errors.siteTitle.message}
            </p>
          )}

        </div>




        <div className="space-y-2">

          <Label>
            Full Name
          </Label>

          <Input
            {...register("fullName")}
          />

        </div>




        <div className="space-y-2">

          <Label>
            Email
          </Label>

          <Input
            {...register("email")}
          />

        </div>




        <div className="space-y-2">

          <Label>
            Phone
          </Label>

          <Input
            {...register("phone")}
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




        <div className="space-y-2">

          <Label>
            Tagline
          </Label>

          <Input
            {...register("tagline")}
          />

        </div>


      </div>





      <div className="space-y-2">

        <Label>
          Site Description
        </Label>

        <textarea
          {...register("siteDescription")}
          className="min-h-24 w-full rounded-lg border bg-transparent px-3 py-2 text-sm"
        />

      </div>





      <div className="space-y-2">

        <Label>
          Bio
        </Label>

        <textarea
          {...register("bio")}
          className="min-h-40 w-full rounded-lg border bg-transparent px-3 py-2 text-sm"
        />

      </div>





      <div className="grid gap-6 md:grid-cols-2">


        <div className="space-y-2">

          <Label>
            Profile Image Asset ID
          </Label>

          <Input
            {...register("profileImageId")}
          />

        </div>




        <div className="space-y-2">

          <Label>
            Resume Asset ID
          </Label>

          <Input
            {...register("resumeAssetId")}
          />

        </div>


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

          "Save Settings"

        )}

      </Button>


    </form>
  );
}
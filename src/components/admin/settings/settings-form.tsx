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
    about: string;
    email: string;
    phone: string;
    location: string;

    profileImageId: string;
    aboutImageId: string;
    ogImageId: string;
    faviconId: string;

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

      about:
        settings.about,

      email:
        settings.email,

      phone:
        settings.phone,

      location:
        settings.location,


      profileImageId:
        settings.profileImageId,


      aboutImageId:
        settings.aboutImageId,


      ogImageId:
        settings.ogImageId,


      faviconId:
        settings.faviconId,


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

      className="
      space-y-8
      rounded-xl
      border
      p-6
      "

    >





      <div
        className="
        grid
        gap-6
        md:grid-cols-2
        "
      >




        <div className="space-y-2">

          <Label>
            Site Title
          </Label>


          <Input
            {...register("siteTitle")}
            placeholder="Ayush Tripathi Portfolio"
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
            placeholder="Ayush Tripathi"
          />

        </div>








        <div className="space-y-2">

          <Label>
            Email
          </Label>


          <Input
            type="email"
            {...register("email")}
            placeholder="email@example.com"
          />


          {errors.email && (

            <p className="text-sm text-destructive">
              {errors.email.message}
            </p>

          )}

        </div>








        <div className="space-y-2">

          <Label>
            Phone
          </Label>


          <Input
            {...register("phone")}
            placeholder="+91 XXXXX XXXXX"
          />

        </div>








        <div className="space-y-2">

          <Label>
            Location
          </Label>


          <Input
            {...register("location")}
            placeholder="Prayagraj, India"
          />

        </div>








        <div className="space-y-2">

          <Label>
            Hero Tagline
          </Label>


          <Input
            {...register("tagline")}
            placeholder="Competitive Programmer | Cybersecurity Analyst"
          />

        </div>


      </div>









      <div className="space-y-2">


        <Label>
          Site Description
        </Label>


        <textarea

          {...register("siteDescription")}

          className="
          min-h-28
          w-full
          rounded-lg
          border
          bg-transparent
          px-3
          py-2
          text-sm
          outline-none
          "

        />


      </div>









      <div className="space-y-2">


        <Label>
          Hero Bio
        </Label>


        <textarea

          {...register("bio")}

          className="
          min-h-36
          w-full
          rounded-lg
          border
          bg-transparent
          px-3
          py-2
          text-sm
          outline-none
          "

        />


      </div>









      <div className="space-y-2">


        <Label>
          About Section
        </Label>


        <textarea

          {...register("about")}

          className="
          min-h-60
          w-full
          rounded-lg
          border
          bg-transparent
          px-3
          py-2
          text-sm
          outline-none
          "

          placeholder="
          Detailed story about yourself, education, interests, journey and expertise.
          "

        />


      </div>









      <div
        className="
        grid
        gap-6
        md:grid-cols-2
        "
      >




        <AssetInput
          label="Profile Image Asset ID"
          register={register}
          name="profileImageId"
        />



        <AssetInput
          label="About Page Image Asset ID"
          register={register}
          name="aboutImageId"
        />



        <AssetInput
          label="OG Image Asset ID"
          register={register}
          name="ogImageId"
        />



        <AssetInput
          label="Favicon Asset ID"
          register={register}
          name="faviconId"
        />



        <AssetInput
          label="Resume Asset ID"
          register={register}
          name="resumeAssetId"
        />


      </div>









      {serverError && (

        <div
          className="
          rounded-md
          bg-destructive/10
          p-3
          text-sm
          text-destructive
          "
        >

          {serverError}

        </div>

      )}









      <Button
        type="submit"
        disabled={isSubmitting}
      >


        {isSubmitting ? (

          <>

            <Loader2
              className="
              size-4
              animate-spin
              "
            />

            Saving...

          </>


        ) : (

          "Save Settings"

        )}



      </Button>




    </form>

  );

}








function AssetInput({
  label,
  register,
  name,
}: {
  label: string;
  register: ReturnType<typeof useForm<UpdateSettingInput>>["register"];
  name:
    | "profileImageId"
    | "aboutImageId"
    | "ogImageId"
    | "faviconId"
    | "resumeAssetId";
}) {


  return (

    <div className="space-y-2">


      <Label>
        {label}
      </Label>


      <Input

        {...register(name)}

        placeholder="Asset ID"

      />


    </div>

  );

}
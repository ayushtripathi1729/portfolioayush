"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { z } from "zod";

import {
  createSocialLinkSchema,
  socialPlatformValues,
} from "@/validations/social-link.schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


const socialLinkFormSchema =
  createSocialLinkSchema.omit({ settingId: true });

type SocialLinkFormValues =
  z.input<typeof socialLinkFormSchema>;

type SocialLinkFormInput =
  z.output<typeof socialLinkFormSchema>;

const platformLabels: Record<(typeof socialPlatformValues)[number], string> = {
  GITHUB: "GitHub",
  LINKEDIN: "LinkedIn",
  LEETCODE: "LeetCode",
  CODEFORCES: "Codeforces",
  CODECHEF: "CodeChef",
  HACKERRANK: "HackerRank",
  HACKERONE: "HackerOne",
  TRYHACKME: "TryHackMe",
  ROOTME: "RootMe",
  HTB: "Hack The Box",
  CTFTIME: "CTFtime",
  INTIGRITI: "Intigriti",
  BUGCROWD: "Bugcrowd",
  KAGGLE: "Kaggle",
  GOOGLE_SCHOLAR: "Google Scholar",
  ORCID: "ORCID",
  RESEARCHGATE: "ResearchGate",
  MEDIUM: "Medium",
  DEVTO: "DEV Community",
  YOUTUBE: "YouTube",
  X: "X",
  INSTAGRAM: "Instagram",
  FACEBOOK: "Facebook",
  CUSTOM: "Custom",
};



export function SocialLinkForm() {


  const router = useRouter();


  const [serverError, setServerError] =
    useState("");

  const [usedPlatforms, setUsedPlatforms] =
    useState<Set<string>>(new Set());



  const {
    register,
    setValue,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<
    SocialLinkFormValues,
    unknown,
    SocialLinkFormInput
  >({

    resolver:
      zodResolver(
        socialLinkFormSchema
      ),


    defaultValues: {

      platform: "GITHUB",

      label: "",

      url: "",

      username: "",

      visible: true,

      displayOrder: 0,

    },

  });

  useEffect(() => {
    async function loadUsedPlatforms() {
      try {
        const response = await fetch("/api/social-links");
        const result = await response.json();

        if (!response.ok || !result.success) {
          return;
        }

        const used = new Set<string>(
          result.data.map((link: { platform: string }) => link.platform)
        );
        setUsedPlatforms(used);

        const nextPlatform = socialPlatformValues.find(
          (platform) => !used.has(platform)
        );

        if (nextPlatform) {
          setValue("platform", nextPlatform, { shouldValidate: true });
        }
      } catch {
        // Creation still has server-side uniqueness validation as a fallback.
      }
    }

    loadUsedPlatforms();
  }, [setValue]);






  async function onSubmit(
    values: SocialLinkFormInput
  ) {


    setServerError("");



    try {


      const response =
        await fetch(
          "/api/social-links",
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
          "Failed to create social link."
        );

        return;

      }





      router.push(
        "/admin/social-links"
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
            Platform
          </Label>


          <select

            {...register("platform")}

            className="w-full rounded-lg border bg-transparent px-3 py-2 text-sm"

          >

            {socialPlatformValues.map((platform) => (
              <option
                key={platform}
                value={platform}
                disabled={usedPlatforms.has(platform)}
              >
                {platformLabels[platform]}
                {usedPlatforms.has(platform) ? " (already added)" : ""}
              </option>
            ))}


          </select>

          {errors.platform && (
            <p className="text-sm text-destructive">
              {errors.platform.message}
            </p>
          )}


        </div>






        <div className="space-y-2">

          <Label>
            Label
          </Label>


          <Input

            {...register("label")}

            placeholder="GitHub Profile"

          />

          {errors.label && (
            <p className="text-sm text-destructive">
              {errors.label.message}
            </p>
          )}


        </div>







        <div className="space-y-2">

          <Label>
            Username
          </Label>


          <Input

            {...register("username")}

            placeholder="username"

          />

          {errors.username && (
            <p className="text-sm text-destructive">
              {errors.username.message}
            </p>
          )}


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



      </div>








      <div className="space-y-2">


        <Label>
          URL
        </Label>


        <Input

          {...register("url")}

          placeholder="https://..."

        />



        {errors.url && (

          <p className="text-sm text-destructive">

            {errors.url.message}

          </p>

        )}



      </div>









      <label className="flex items-center gap-2 text-sm">


        <input

          type="checkbox"

          {...register("visible")}

        />


        Visible


      </label>









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

          "Create Social Link"

        )}


      </Button>





    </form>

  );

}

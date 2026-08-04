"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { z } from "zod";

import {
  createSocialLinkSchema,
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



export function SocialLinkForm() {


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

            <option value="GITHUB">
              GitHub
            </option>

            <option value="LINKEDIN">
              LinkedIn
            </option>

            <option value="LEETCODE">
              LeetCode
            </option>

            <option value="CODEFORCES">
              Codeforces
            </option>

            <option value="CODECHEF">
              CodeChef
            </option>

            <option value="HACKERONE">
              HackerOne
            </option>

            <option value="TRYHACKME">
              TryHackMe
            </option>

            <option value="ROOTME">
              RootMe
            </option>

            <option value="CUSTOM">
              Custom
            </option>


          </select>


        </div>






        <div className="space-y-2">

          <Label>
            Label
          </Label>


          <Input

            {...register("label")}

            placeholder="GitHub Profile"

          />


        </div>







        <div className="space-y-2">

          <Label>
            Username
          </Label>


          <Input

            {...register("username")}

            placeholder="username"

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

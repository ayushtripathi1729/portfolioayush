"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import {
  createBlogSchema,
  type CreateBlogInput,
} from "@/validations/blog.schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";



export function BlogForm() {


  const router = useRouter();


  const [serverError, setServerError] =
    useState("");

  const [success, setSuccess] =
    useState("");





  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } =
    useForm<
      CreateBlogInput,
      unknown,
      CreateBlogInput
    >({

      resolver:
        zodResolver(
          createBlogSchema
        ),


      defaultValues: {

        title: "",

        slug: "",

        excerpt: "",

        content: "",

        coverImageId: "",

        published: false,

        publishedAt: undefined,

        featured: false,

        visible: true,

        displayOrder: 0,

      },

    });








  async function onSubmit(
    values: CreateBlogInput
  ) {


    setServerError("");

    setSuccess("");



    try {


      const response =
        await fetch(
          "/api/blog",
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
          "Failed to create blog."
        );


        console.error(
          result.errors
        );


        return;

      }








      setSuccess(
        "Blog created successfully."
      );






      setTimeout(() => {

        router.push(
          "/admin/blog"
        );

        router.refresh();


      }, 1000);





    } catch (error) {


      console.error(error);


      setServerError(
        "Something went wrong."
      );


    }


  }









  return (

    <form

      onSubmit={
        handleSubmit(
          onSubmit,
          (errors) => {
            console.log("FORM VALIDATION ERRORS:", errors);
          }
        )
      }

      className="
      space-y-6
      rounded-xl
      border
      p-6
      "

    >





      <div className="space-y-2">

        <Label>
          Title
        </Label>


        <Input

          {...register("title")}

          placeholder="Blog title"

        />


        {
          errors.title && (

            <p className="text-sm text-destructive">

              {errors.title.message}

            </p>

          )
        }


      </div>









      <div className="space-y-2">


        <Label>
          Slug
        </Label>


        <Input

          {...register("slug")}

          placeholder="blog-title"

        />


        {
          errors.slug && (

            <p className="text-sm text-destructive">

              {errors.slug.message}

            </p>

          )
        }


      </div>









      <div className="space-y-2">


        <Label>
          Excerpt
        </Label>


        <Input

          {...register("excerpt")}

          placeholder="Short description"

        />


      </div>









      <div className="space-y-2">


        <Label>
          Content
        </Label>


        <textarea

          {...register("content")}


          className="
          min-h-64
          w-full
          rounded-lg
          border
          bg-transparent
          px-3
          py-2
          text-sm
          outline-none
          "


          placeholder="Write blog content..."

        />



        {
          errors.content && (

            <p className="text-sm text-destructive">

              {errors.content.message}

            </p>

          )
        }


      </div>









      <div className="space-y-2">


        <Label>
          Cover Image Asset ID
        </Label>


        <Input

          {...register("coverImageId")}

          placeholder="Optional Asset ID"

        />


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
              setValueAs: (value) =>
                value
                  ? new Date(value)
                  : undefined,
            }
          )}

        />



        {
          errors.publishedAt && (

            <p className="text-sm text-destructive">

              {errors.publishedAt.message}

            </p>

          )
        }


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

            {...register("published")}

          />


          Published


        </label>







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









      {
        success && (

          <div
            className="
            rounded-md
            bg-green-500/10
            p-3
            text-sm
            text-green-600
            "
          >

            {success}

          </div>

        )
      }








      {
        serverError && (

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

        )
      }









      <Button

        type="submit"

        disabled={isSubmitting}

      >

        {
          isSubmitting ? (

            <>

              <Loader2
                className="
                size-4
                animate-spin
                "
              />

              Creating...

            </>

          ) : (

            "Create Blog"

          )
        }


      </Button>





    </form>

  );

}
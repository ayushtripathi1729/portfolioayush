"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import {
  updateSkillSchema,
  type UpdateSkillInput,
} from "@/validations/skill.schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


interface SkillCategory {
  id: string;
  name: string;
}


interface EditSkillFormProps {
  skill: {
    id: string;
    name: string;
    slug: string;
    level:
      | "BEGINNER"
      | "INTERMEDIATE"
      | "ADVANCED"
      | "EXPERT";
    icon: string;
    displayOrder: number;
    featured: boolean;
    visible: boolean;
    categoryId: string;
  };
}



export function EditSkillForm({
  skill,
}: EditSkillFormProps) {

  const router = useRouter();


  const [serverError, setServerError] =
    useState("");


  const [categories, setCategories] =
    useState<SkillCategory[]>([]);


  const [loadingCategories, setLoadingCategories] =
    useState(true);




  useEffect(() => {

    async function loadCategories() {

      try {

        const response =
          await fetch(
            "/api/skill-categories"
          );


        const result =
          await response.json();


        if (result.success) {
          setCategories(result.data);
        }


      } finally {

        setLoadingCategories(false);

      }

    }


    loadCategories();

  }, []);






  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<UpdateSkillInput>({

    resolver:
      zodResolver(
        updateSkillSchema
      ),


    defaultValues: {

      name: skill.name,

      slug: skill.slug,

      level: skill.level,

      icon: skill.icon,

      displayOrder:
        skill.displayOrder,

      featured:
        skill.featured,

      visible:
        skill.visible,

      categoryId:
        skill.categoryId,

    },

  });







  async function onSubmit(
    values: UpdateSkillInput
  ) {

    setServerError("");



    try {

      const response =
        await fetch(
          `/api/skills/${skill.id}`,
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
          "Failed to update skill."
        );

        return;

      }




      router.push(
        "/admin/skills"
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
          Skill Name
        </Label>


        <Input
          {...register("name")}
        />


        {errors.name && (
          <p className="text-sm text-destructive">
            {errors.name.message}
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
          Icon
        </Label>


        <Input
          {...register("icon")}
        />

      </div>








      <div className="space-y-2">

        <Label>
          Level
        </Label>


        <select
          {...register("level")}
          className="h-9 w-full rounded-lg border bg-transparent px-3 text-sm"
        >

          <option value="BEGINNER">
            Beginner
          </option>


          <option value="INTERMEDIATE">
            Intermediate
          </option>


          <option value="ADVANCED">
            Advanced
          </option>


          <option value="EXPERT">
            Expert
          </option>


        </select>


      </div>








      <div className="space-y-2">

        <Label>
          Category
        </Label>


        <select
          {...register("categoryId")}
          disabled={
            loadingCategories
          }
          className="h-9 w-full rounded-lg border bg-transparent px-3 text-sm"
        >

          <option value="">
            Select category
          </option>


          {categories.map(
            (category) => (

              <option
                key={category.id}
                value={category.id}
              >

                {category.name}

              </option>

            )
          )}

        </select>


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
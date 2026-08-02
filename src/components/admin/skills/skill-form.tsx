"use client";


import {
  useEffect,
  useState,
} from "react";


import {
  useRouter,
} from "next/navigation";


import {
  useForm,
} from "react-hook-form";


import {
  zodResolver,
} from "@hookform/resolvers/zod";


import {
  Loader2,
} from "lucide-react";



import {
  createSkillSchema,
  type CreateSkillInput,
} from "@/validations/skill.schema";


import {
  Button,
} from "@/components/ui/button";


import {
  Input,
} from "@/components/ui/input";


import {
  Label,
} from "@/components/ui/label";


import {
  CreateSkillCategoryDialog,
} from "./create-skill-category-dialog";





interface SkillCategory {

  id: string;

  name: string;

}







export function SkillForm() {


  const router =
    useRouter();




  const [
    serverError,
    setServerError,
  ] = useState("");





  const [
    categories,
    setCategories,
  ] = useState<SkillCategory[]>([]);





  const [
    loadingCategories,
    setLoadingCategories,
  ] = useState(true);







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

          setCategories(
            result.data
          );

        }



      } catch {


        setServerError(
          "Failed to load skill categories."
        );


      } finally {


        setLoadingCategories(false);


      }


    }




    loadCategories();



  }, []);









  function handleCategoryCreated(
    category: SkillCategory
  ) {


    setCategories(
      (previous) => [
        ...previous,
        category,
      ]
    );


  }









  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } =
    useForm<CreateSkillInput>({


      resolver:
        zodResolver(
          createSkillSchema
        ),



      defaultValues: {


        name: "",


        slug: "",


        level: "BEGINNER",


        icon: "",


        displayOrder: 0,


        featured: false,


        visible: true,


        categoryId: "",


      },


    });









  async function onSubmit(
    values: CreateSkillInput
  ) {


    setServerError("");



    try {


      const response =
        await fetch(
          "/api/skills",
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
          "Failed to create skill."
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

      className="
      space-y-6
      rounded-xl
      border
      p-6
      "

    >







      <div className="space-y-2">


        <Label>
          Skill Name
        </Label>



        <Input

          {...register("name")}

          placeholder="React"

        />



        {
          errors.name && (

            <p className="text-sm text-destructive">

              {errors.name.message}

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

          placeholder="react"

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
          Icon
        </Label>



        <Input

          {...register("icon")}

          placeholder="react-icon"

        />


      </div>









      <div className="space-y-2">


        <Label>
          Level
        </Label>




        <select

          {...register("level")}

          className="
          h-9
          w-full
          rounded-lg
          border
          bg-transparent
          px-3
          text-sm
          "

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





        {
          errors.level && (

            <p className="text-sm text-destructive">

              {errors.level.message}

            </p>

          )
        }


      </div>









      <div className="space-y-2">


        <Label>
          Category
        </Label>





        <div className="flex gap-3">


          <select

            {...register("categoryId")}

            disabled={
              loadingCategories
            }

            className="
            h-9
            flex-1
            rounded-lg
            border
            bg-transparent
            px-3
            text-sm
            "

          >


            <option value="">
              Select category
            </option>




            {
              categories.map(
                (category) => (


                  <option

                    key={
                      category.id
                    }

                    value={
                      category.id
                    }

                  >

                    {
                      category.name
                    }


                  </option>


                )
              )
            }




          </select>






          <CreateSkillCategoryDialog

            onCreated={
              handleCategoryCreated
            }

          />



        </div>






        {
          errors.categoryId && (

            <p className="text-sm text-destructive">

              {errors.categoryId.message}

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

        disabled={
          isSubmitting
        }

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


            "Create Skill"


          )
        }



      </Button>





    </form>


  );

}
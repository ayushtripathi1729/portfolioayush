"use client";


import {
  useState,
} from "react";


import {
  Plus,
  Loader2,
} from "lucide-react";


import {
  useRouter,
} from "next/navigation";


import {
  Button,
} from "@/components/ui/button";


import {
  Input,
} from "@/components/ui/input";


import {
  Label,
} from "@/components/ui/label";





interface CreatedCategory {

  id: string;

  name: string;

  slug: string;

}





interface CreateSkillCategoryDialogProps {

  onCreated: (
    category: CreatedCategory
  ) => void;

}






export function CreateSkillCategoryDialog({

  onCreated,

}: CreateSkillCategoryDialogProps) {



  const router = useRouter();



  const [
    open,
    setOpen,
  ] = useState(false);



  const [
    loading,
    setLoading,
  ] = useState(false);



  const [
    error,
    setError,
  ] = useState("");





  const [
    name,
    setName,
  ] = useState("");



  const [
    slug,
    setSlug,
  ] = useState("");






  function generateSlug(
    value: string
  ) {

    return value
      .toLowerCase()
      .trim()
      .replace(
        /[^a-z0-9]+/g,
        "-"
      )
      .replace(
        /(^-|-$)/g,
        ""
      );

  }







  function handleNameChange(
    value: string
  ) {

    setName(value);


    setSlug(
      generateSlug(value)
    );

  }








  async function handleCreate() {


    if (!name.trim()) {

      setError(
        "Category name is required."
      );

      return;

    }





    setLoading(true);

    setError("");





    try {


      const response =
        await fetch(
          "/api/skill-categories",
          {

            method: "POST",


            headers: {

              "Content-Type":
                "application/json",

            },


            body:
              JSON.stringify({

                name,

                slug,

                description: "",

                displayOrder: 0,

                featured: false,

                visible: true,

              }),

          }
        );





      const result =
        await response.json();






      if (!response.ok) {


        setError(

          result.message ??
          "Failed to create category."

        );


        return;

      }







      const category =
        result.data;





      onCreated({

        id: category.id,

        name: category.name,

        slug: category.slug,

      });





      setName("");

      setSlug("");

      setOpen(false);



      router.refresh();





    } catch {


      setError(
        "Something went wrong."
      );



    } finally {


      setLoading(false);


    }


  }









  return (

    <>


      <Button

        type="button"

        variant="outline"

        onClick={() => {

          setOpen(true);

          setError("");

        }}

      >

        <Plus className="size-4" />

        New Category


      </Button>









      {
        open && (

          <div

            className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/50
            px-4
            "

          >





            <div

              className="
              w-full
              max-w-md
              space-y-6
              rounded-xl
              border
              bg-background
              p-6
              shadow-xl
              "

            >




              <div>

                <h2
                  className="
                  text-xl
                  font-semibold
                  "
                >
                  Create Skill Category
                </h2>


                <p
                  className="
                  mt-1
                  text-sm
                  text-muted-foreground
                  "
                >
                  Add a new category without leaving skill creation.
                </p>


              </div>









              <div className="space-y-2">

                <Label>
                  Category Name
                </Label>


                <Input

                  value={name}

                  onChange={(e) =>
                    handleNameChange(
                      e.target.value
                    )
                  }

                  placeholder="Mathematics"

                />

              </div>









              <div className="space-y-2">

                <Label>
                  Slug
                </Label>


                <Input

                  value={slug}

                  onChange={(e) =>
                    setSlug(
                      e.target.value
                    )
                  }

                  placeholder="mathematics"

                />

              </div>









              {
                error && (

                  <p
                    className="
                    rounded-md
                    bg-destructive/10
                    p-3
                    text-sm
                    text-destructive
                    "
                  >
                    {error}
                  </p>

                )
              }









              <div
                className="
                flex
                justify-end
                gap-3
                "
              >



                <Button

                  type="button"

                  variant="outline"

                  disabled={loading}

                  onClick={() => {

                    setOpen(false);

                    setError("");

                  }}

                >

                  Cancel

                </Button>







                <Button

                  type="button"

                  disabled={loading}

                  onClick={handleCreate}

                >


                  {
                    loading ? (

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

                      "Create"

                    )
                  }


                </Button>



              </div>






            </div>




          </div>

        )
      }



    </>

  );

}
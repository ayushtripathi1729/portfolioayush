import Link from "next/link";
import { Plus, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SkillCategoryActions } from "./skill-category-actions";



interface SkillCategoryTableProps {

  categories: Array<{

    id: string;

    name: string;

    slug: string;

    featured: boolean;

    visible: boolean;

    displayOrder: number;

    createdAt: Date;

  }>;

}







export function SkillCategoryTable({
  categories,
}: SkillCategoryTableProps) {



  if (categories.length === 0) {


    return (

      <div
        className="
        rounded-xl
        border
        p-8
        text-center
        "
      >


        <h3
          className="
          text-lg
          font-semibold
          "
        >
          No categories found
        </h3>



        <p
          className="
          mt-2
          text-sm
          text-muted-foreground
          "
        >
          Create your first skill category.
        </p>





        <Link href="/admin/skill-categories/new">


          <Button
            className="mt-5"
          >


            <Plus className="size-4" />


            New Category


          </Button>


        </Link>



      </div>

    );

  }







  return (

    <div
      className="
      overflow-hidden
      rounded-xl
      border
      "
    >



      <div
        className="
        overflow-x-auto
        "
      >



        <table
          className="
          w-full
          "
        >



          <thead
            className="
            border-b
            bg-muted/40
            "
          >


            <tr
              className="
              text-left
              text-sm
              "
            >


              <th className="px-5 py-3 font-medium">
                Category
              </th>



              <th className="px-5 py-3 font-medium">
                Slug
              </th>




              <th className="px-5 py-3 font-medium">
                Order
              </th>




              <th className="px-5 py-3 font-medium">
                Homepage
              </th>




              <th className="px-5 py-3 font-medium">
                Visibility
              </th>




              <th className="px-5 py-3 font-medium">
                Actions
              </th>



            </tr>


          </thead>









          <tbody>


            {
              categories.map((category) => (


                <tr

                  key={category.id}

                  className="
                  border-b
                  transition-colors
                  hover:bg-muted/30
                  last:border-0
                  "

                >




                  <td
                    className="
                    px-5
                    py-4
                    "
                  >

                    <p
                      className="
                      font-medium
                      "
                    >

                      {category.name}

                    </p>


                  </td>









                  <td
                    className="
                    px-5
                    py-4
                    text-sm
                    text-muted-foreground
                    "
                  >

                    {category.slug}

                  </td>









                  <td
                    className="
                    px-5
                    py-4
                    text-sm
                    "
                  >

                    {category.displayOrder}

                  </td>









                  <td
                    className="
                    px-5
                    py-4
                    text-sm
                    "
                  >

                    {
                      category.featured ? (

                        <span
                          className="
                          inline-flex
                          items-center
                          gap-1
                          rounded-full
                          bg-primary/10
                          px-3
                          py-1
                          text-xs
                          font-medium
                          text-primary
                          "
                        >

                          <Star
                            className="
                            size-3
                            fill-current
                            "
                          />

                          Featured

                        </span>

                      ) : (

                        <span
                          className="
                          text-muted-foreground
                          "
                        >
                          —
                        </span>

                      )
                    }

                  </td>









                  <td
                    className="
                    px-5
                    py-4
                    text-sm
                    "
                  >

                    {
                      category.visible ? (

                        <span
                          className="
                          text-green-600
                          "
                        >
                          Visible
                        </span>

                      ) : (

                        <span
                          className="
                          text-muted-foreground
                          "
                        >
                          Hidden
                        </span>

                      )
                    }

                  </td>









                  <td
                    className="
                    px-5
                    py-4
                    "
                  >


                    <SkillCategoryActions
                      id={category.id}
                    />


                  </td>





                </tr>


              ))
            }




          </tbody>



        </table>



      </div>



    </div>


  );

}
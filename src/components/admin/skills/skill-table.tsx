import Link from "next/link";
import { Plus, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SkillActions } from "./skill-actions";


interface SkillTableProps {
  skills: Array<{
    id: string;
    name: string;
    slug: string;
    featured: boolean;
    visible: boolean;
    proficiency?: number | null;
    category?: {
      name: string;
    } | null;
    createdAt: Date;
  }>;
}



export function SkillTable({
  skills,
}: SkillTableProps) {


  if (skills.length === 0) {

    return (
      <div className="rounded-xl border p-8 text-center">

        <h3 className="text-lg font-semibold">
          No skills found
        </h3>


        <p className="mt-2 text-sm text-muted-foreground">
          Add your first technical skill.
        </p>



        <Link href="/admin/skills/new">

          <Button className="mt-5">

            <Plus className="size-4" />

            New Skill

          </Button>

        </Link>


      </div>
    );

  }





  return (
    <div className="overflow-hidden rounded-xl border">


      <div className="overflow-x-auto">


        <table className="w-full">


          <thead className="border-b bg-muted/40">


            <tr className="text-left text-sm">


              <th className="px-5 py-3 font-medium">
                Skill
              </th>


              <th className="px-5 py-3 font-medium">
                Category
              </th>


              <th className="px-5 py-3 font-medium">
                Proficiency
              </th>


              <th className="px-5 py-3 font-medium">
                Status
              </th>


              <th className="px-5 py-3 font-medium">
                Actions
              </th>


            </tr>


          </thead>




          <tbody>


            {skills.map((skill) => (

              <tr
                key={skill.id}
                className="border-b transition-colors hover:bg-muted/30 last:border-0"
              >


                <td className="px-5 py-4">


                  <div className="flex items-center gap-2">


                    <p className="font-medium">
                      {skill.name}
                    </p>



                    {skill.featured && (

                      <Star
                        className="size-4 fill-current text-yellow-500"
                      />

                    )}


                  </div>


                  <p className="mt-1 text-xs text-muted-foreground">
                    /{skill.slug}
                  </p>


                </td>





                <td className="px-5 py-4 text-sm">

                  {skill.category?.name ??
                    "Uncategorized"}

                </td>





                <td className="px-5 py-4 text-sm">


                  {skill.proficiency !== null &&
                  skill.proficiency !== undefined ? (

                    <div className="flex items-center gap-3">

                      <div className="h-2 w-28 overflow-hidden rounded-full bg-muted">

                        <div
                          className="h-full bg-primary"
                          style={{
                            width: `${skill.proficiency}%`,
                          }}
                        />

                      </div>


                      <span>
                        {skill.proficiency}%
                      </span>


                    </div>

                  ) : (

                    "—"

                  )}


                </td>





                <td className="px-5 py-4 text-sm">


                  <div className="space-y-1">


                    <p>
                      {skill.visible
                        ? "Visible"
                        : "Hidden"}
                    </p>


                    {skill.featured && (

                      <p className="text-xs text-primary">
                        Featured
                      </p>

                    )}


                  </div>


                </td>





                <td className="px-5 py-4">

                  <SkillActions
                    id={skill.id}
                  />

                </td>



              </tr>


            ))}


          </tbody>


        </table>


      </div>


    </div>
  );
}
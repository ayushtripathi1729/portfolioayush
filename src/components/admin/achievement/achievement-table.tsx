"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";


interface AchievementTableProps {
  achievements: Array<{
    id: string;
    title: string;
    category: string | null;
    issuer: string | null;
    issueDate: Date | null;
    visible: boolean;
  }>;
}



export function AchievementTable({
  achievements,
}: AchievementTableProps) {


  const router = useRouter();



  async function deleteAchievement(
    id: string
  ) {

    const confirmed =
      window.confirm(
        "Delete this achievement?"
      );


    if (!confirmed) {
      return;
    }



    await fetch(
      `/api/achievement/${id}`,
      {
        method: "DELETE",
      }
    );


    router.refresh();

  }





  return (

    <div className="rounded-xl border">

      <div className="overflow-x-auto">

        <table className="w-full text-sm">


          <thead className="border-b bg-muted/50">

            <tr>

              <th className="px-4 py-3 text-left">
                Title
              </th>


              <th className="px-4 py-3 text-left">
                Category
              </th>


              <th className="px-4 py-3 text-left">
                Issuer
              </th>


              <th className="px-4 py-3 text-left">
                Date
              </th>


              <th className="px-4 py-3 text-left">
                Status
              </th>


              <th className="px-4 py-3 text-right">
                Actions
              </th>

            </tr>

          </thead>




          <tbody>


            {achievements.length === 0 && (

              <tr>

                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  No achievements found.
                </td>

              </tr>

            )}



            {achievements.map(
              (achievement) => (

                <tr
                  key={achievement.id}
                  className="border-b last:border-0"
                >


                  <td className="px-4 py-3 font-medium">

                    {achievement.title}

                  </td>



                  <td className="px-4 py-3">

                    {achievement.category ?? "-"}

                  </td>



                  <td className="px-4 py-3">

                    {achievement.issuer ?? "-"}

                  </td>



                  <td className="px-4 py-3">

                    {achievement.issueDate
                      ? achievement.issueDate
                          .toLocaleDateString()
                      : "-"}

                  </td>



                  <td className="px-4 py-3">

                    {achievement.visible
                      ? "Visible"
                      : "Hidden"}

                  </td>




                  <td className="px-4 py-3">

                    <div className="flex justify-end gap-2">


                      <Link
                        href={`/admin/achievement/${achievement.id}/edit`}
                      >

                        <Button
                          variant="outline"
                          size="icon"
                        >

                          <Pencil className="size-4" />

                        </Button>

                      </Link>




                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() =>
                          deleteAchievement(
                            achievement.id
                          )
                        }
                      >

                        <Trash2 className="size-4" />

                      </Button>


                    </div>

                  </td>


                </tr>

              )
            )}


          </tbody>


        </table>


      </div>


    </div>

  );
}
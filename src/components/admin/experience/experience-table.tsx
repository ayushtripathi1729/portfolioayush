import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ExperienceActions } from "./experience-actions";



interface ExperienceTableProps {
  experiences: Array<{
    id: string;
    company: string;
    position: string;
    employmentType: string | null;
    location: string | null;
    startDate: Date;
    endDate: Date | null;
    isCurrent: boolean;
    visible: boolean;
    displayOrder: number;
  }>;
}



function formatDate(date: Date) {
  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "short",
      year: "numeric",
    }
  ).format(new Date(date));
}





export function ExperienceTable({
  experiences,
}: ExperienceTableProps) {


  if (experiences.length === 0) {

    return (
      <div className="rounded-xl border p-8 text-center">


        <h3 className="text-lg font-semibold">
          No experience found
        </h3>


        <p className="mt-2 text-sm text-muted-foreground">
          Add your first professional experience.
        </p>




        <Link href="/admin/experience/new">

          <Button className="mt-5">

            <Plus className="size-4" />

            New Experience

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
                Company
              </th>


              <th className="px-5 py-3 font-medium">
                Position
              </th>


              <th className="px-5 py-3 font-medium">
                Duration
              </th>


              <th className="px-5 py-3 font-medium">
                Status
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


            {experiences.map((experience) => (

              <tr
                key={experience.id}
                className="border-b last:border-0"
              >


                <td className="px-5 py-4">


                  <div className="space-y-1">


                    <p className="font-medium">
                      {experience.company}
                    </p>


                    {experience.location && (

                      <p className="text-xs text-muted-foreground">
                        {experience.location}
                      </p>

                    )}


                  </div>


                </td>





                <td className="px-5 py-4">


                  <div className="space-y-1">


                    <p className="font-medium">
                      {experience.position}
                    </p>


                    {experience.employmentType && (

                      <p className="text-xs text-muted-foreground">
                        {experience.employmentType}
                      </p>

                    )}


                  </div>


                </td>





                <td className="px-5 py-4 text-sm">


                  <div>

                    <p>
                      {formatDate(
                        experience.startDate
                      )}
                      {" - "}
                      {experience.isCurrent
                        ? "Present"
                        : experience.endDate
                          ? formatDate(
                              experience.endDate
                            )
                          : "-"
                      }
                    </p>


                  </div>


                </td>





                <td className="px-5 py-4 text-sm">


                  {experience.isCurrent ? (

                    <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                      Current
                    </span>

                  ) : (

                    <span className="rounded-full bg-muted px-2 py-1 text-xs">
                      Completed
                    </span>

                  )}


                </td>





                <td className="px-5 py-4 text-sm">


                  {experience.visible
                    ? "Visible"
                    : "Hidden"}


                </td>





                <td className="px-5 py-4">


                  <ExperienceActions
                    id={experience.id}
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
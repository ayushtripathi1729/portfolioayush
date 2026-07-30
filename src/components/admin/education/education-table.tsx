"use client";

import Link from "next/link";
import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DeleteEducationButton } from "@/components/admin/education/delete-education-button";


interface EducationTableProps {
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    branch: string | null;
    location: string | null;
    isCurrent: boolean;
    gradeType: string;
    gradeValue: number;
    visible: boolean;
    startDate: Date;
    endDate: Date | null;
  }>;
}



export function EducationTable({
  education,
}: EducationTableProps) {

  return (
    <div className="overflow-x-auto rounded-xl border">


      <table className="w-full text-sm">


        <thead className="border-b bg-muted/50">

          <tr>

            <th className="px-4 py-3 text-left">
              Institution
            </th>


            <th className="px-4 py-3 text-left">
              Degree
            </th>


            <th className="px-4 py-3 text-left">
              Grade
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

          {education.map((item) => (

            <tr
              key={item.id}
              className="border-b last:border-none"
            >


              <td className="px-4 py-3">

                <div className="font-medium">
                  {item.institution}
                </div>


                {item.location && (
                  <div className="text-xs text-muted-foreground">
                    {item.location}
                  </div>
                )}

              </td>





              <td className="px-4 py-3">

                <div>
                  {item.degree}
                </div>


                {item.branch && (
                  <div className="text-xs text-muted-foreground">
                    {item.branch}
                  </div>
                )}

              </td>





              <td className="px-4 py-3">

                {item.gradeValue}{" "}

                {item.gradeType === "CGPA"
                  ? "CGPA"
                  : "%"}

              </td>





              <td className="px-4 py-3">

                <span className="rounded-full border px-2 py-1 text-xs">

                  {item.isCurrent
                    ? "Current"
                    : "Completed"}

                </span>


              </td>





              <td className="px-4 py-3 text-right">


                <div className="flex justify-end gap-2">


                  <Link
                    href={`/admin/education/${item.id}/edit`}
                  >

                    <Button
                      size="icon"
                      variant="outline"
                    >

                      <Pencil className="size-4" />

                    </Button>

                  </Link>





                  <DeleteEducationButton
                    id={item.id}
                  />


                </div>


              </td>


            </tr>

          ))}


        </tbody>


      </table>


    </div>
  );
}
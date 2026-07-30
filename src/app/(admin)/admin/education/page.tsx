import Link from "next/link";
import { GraduationCap } from "lucide-react";

import { educationService } from "@/services/education.service";

import { Button } from "@/components/ui/button";
import { EducationTable } from "@/components/admin/education/education-table";


export default async function EducationAdminPage() {

  const education =
    await educationService.getAllIncludingHidden();



  return (
    <div className="space-y-8">


      <section className="flex items-center justify-between">


        <div className="flex items-center gap-3">


          <GraduationCap className="size-8 text-primary" />


          <div>

            <h1 className="text-3xl font-bold tracking-tight">
              Education
            </h1>


            <p className="text-muted-foreground">
              Manage your education records.
            </p>

          </div>


        </div>





        <Link href="/admin/education/new">

          <Button>
            Add Education
          </Button>

        </Link>


      </section>








      {education.length === 0 ? (

        <div className="rounded-xl border p-6 text-muted-foreground">

          No education records found.

        </div>

      ) : (

        <EducationTable
          education={education.map((item) => ({
            id: item.id,
            institution: item.institution,
            degree: item.degree,
            branch: item.branch,
            location: item.location,
            isCurrent: item.isCurrent,
            gradeType: item.gradeType,
            gradeValue: Number(item.gradeValue),
            visible: item.visible,
            startDate: item.startDate,
            endDate: item.endDate,
          }))}
        />

      )}


    </div>
  );
}
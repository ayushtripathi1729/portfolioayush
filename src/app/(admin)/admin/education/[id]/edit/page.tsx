import { ArrowLeft, GraduationCap } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { EditEducationForm } from "@/components/admin/education/edit-education-form";
import { educationService } from "@/services/education.service";


interface EditEducationPageProps {
  params: Promise<{
    id: string;
  }>;
}



export default async function EditEducationPage({
  params,
}: EditEducationPageProps) {

  const { id } =
    await params;



  const education =
    await educationService.getById(id);



  if (!education) {
    notFound();
  }



  return (
    <div className="space-y-8">


      <section className="flex items-center gap-4">


        <Link href="/admin/education">

          <Button
            variant="outline"
            size="icon"
          >

            <ArrowLeft className="size-4" />

          </Button>

        </Link>





        <div>


          <div className="flex items-center gap-3">


            <GraduationCap className="size-7 text-primary" />


            <h1 className="text-3xl font-bold tracking-tight">
              Edit Education
            </h1>


          </div>




          <p className="mt-2 text-muted-foreground">
            Update education record details.
          </p>


        </div>


      </section>







      <EditEducationForm

        education={{

          id:
            education.id,

          institution:
            education.institution,

          degree:
            education.degree,

          branch:
            education.branch ?? "",

          location:
            education.location ?? "",

          startDate:
            education.startDate,

          endDate:
            education.endDate,

          isCurrent:
            education.isCurrent,

          gradeType:
            education.gradeType,

          gradeValue:
            Number(education.gradeValue),

          description:
            education.description ?? "",

          institutionLogoId:
            education.institutionLogoId ?? "",

          displayOrder:
            education.displayOrder,

          visible:
            education.visible,

        }}

      />


    </div>
  );
}
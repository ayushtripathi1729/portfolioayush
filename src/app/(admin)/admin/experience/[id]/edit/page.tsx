import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EditExperienceForm } from "@/components/admin/experience/edit-experience-form";
import { experienceService } from "@/services/experience.service";


interface EditExperiencePageProps {
  params: Promise<{
    id: string;
  }>;
}



export default async function EditExperiencePage({
  params,
}: EditExperiencePageProps) {

  const { id } = await params;


  const experience =
    await experienceService.getById(id);



  if (!experience) {
    notFound();
  }




  return (
    <div className="space-y-8">


      <section className="flex items-center gap-4">


        <Link href="/admin/experience">

          <Button
            variant="outline"
            size="icon"
          >

            <ArrowLeft className="size-4" />

          </Button>

        </Link>





        <div>

          <h1 className="text-3xl font-bold tracking-tight">
            Edit Experience
          </h1>


          <p className="mt-2 text-muted-foreground">
            Update your professional experience details.
          </p>


        </div>


      </section>






      <EditExperienceForm
        experience={{
          id: experience.id,

          company:
            experience.company,

          position:
            experience.position,

          employmentType:
            experience.employmentType ?? "",

          location:
            experience.location ?? "",

          startDate:
            experience.startDate,

          endDate:
            experience.endDate,

          isCurrent:
            experience.isCurrent,

          description:
            experience.description,

          companyLogoId:
            experience.companyLogoId ?? "",

          displayOrder:
            experience.displayOrder,

          visible:
            experience.visible,
        }}
      />


    </div>
  );
}
import Link from "next/link";
import { Plus, BriefcaseBusiness } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ExperienceTable } from "@/components/admin/experience/experience-table";
import { experienceService } from "@/services/experience.service";


export default async function ExperiencePage() {

  const experiences =
    await experienceService.getAllIncludingHidden();



  return (
    <div className="space-y-8">


      <section className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">


        <div>


          <div className="flex items-center gap-3">


            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">

              <BriefcaseBusiness className="size-5 text-primary" />

            </div>


            <h1 className="text-3xl font-bold tracking-tight">
              Experience
            </h1>


          </div>




          <p className="mt-3 text-muted-foreground">
            Manage your professional experience and career timeline.
          </p>


        </div>





        <Link href="/admin/experience/new">

          <Button>

            <Plus className="size-4" />

            New Experience

          </Button>

        </Link>


      </section>






      <section className="rounded-xl border bg-card p-6">


        <div className="mb-5">


          <h2 className="font-semibold">
            All Experience
          </h2>


          <p className="text-sm text-muted-foreground">

            {experiences.length} experience
            {experiences.length === 1 ? "" : "s"} total

          </p>


        </div>





        <ExperienceTable
          experiences={experiences}
        />


      </section>


    </div>
  );
}
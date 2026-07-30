import Link from "next/link";
import {
  Plus,
  GraduationCap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SkillTable } from "@/components/admin/skills/skill-table";
import { skillService } from "@/services/skill.service";


export default async function SkillsPage() {

  const skills =
    await skillService.getAll();



  return (
    <div className="space-y-8">


      <section className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">


        <div>

          <div className="flex items-center gap-3">

            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">

              <GraduationCap className="size-5 text-primary" />

            </div>


            <h1 className="text-3xl font-bold tracking-tight">
              Skills
            </h1>

          </div>



          <p className="mt-3 text-muted-foreground">
            Manage your technical skills, categories,
            proficiency levels, and visibility.
          </p>


        </div>





        <Link href="/admin/skills/new">

          <Button>

            <Plus className="size-4" />

            New Skill

          </Button>

        </Link>



      </section>





      <section className="rounded-xl border bg-card p-6">


        <div className="mb-5">

          <h2 className="font-semibold">
            All Skills
          </h2>


          <p className="text-sm text-muted-foreground">
            {skills.length} skill
            {skills.length !== 1 ? "s" : ""} total
          </p>


        </div>




        <SkillTable
          skills={skills}
        />


      </section>


    </div>
  );
}
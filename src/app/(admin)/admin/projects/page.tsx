import Link from "next/link";
import {
  Plus,
  FolderKanban,
} from "lucide-react";

import { projectService } from "@/services/project.service";

import { Button } from "@/components/ui/button";
import { ProjectTable } from "@/components/admin/projects/project-table";


export default async function ProjectsPage() {

  const projects =
    await projectService.getAll();



  return (
    <div className="space-y-8">


      <section className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">


        <div>

          <div className="flex items-center gap-3">

            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">

              <FolderKanban className="size-5 text-primary" />

            </div>


            <h1 className="text-3xl font-bold tracking-tight">
              Projects
            </h1>

          </div>



          <p className="mt-3 text-muted-foreground">
            Manage your portfolio projects, visibility,
            publishing status, and featured work.
          </p>


        </div>





        <Link href="/admin/projects/new">

          <Button>

            <Plus className="size-4" />

            New Project

          </Button>


        </Link>



      </section>





      <section className="rounded-xl border bg-card p-6">

        <div className="mb-5 flex items-center justify-between">

          <div>

            <h2 className="font-semibold">
              All Projects
            </h2>


            <p className="text-sm text-muted-foreground">
              {projects.length} project
              {projects.length !== 1 ? "s" : ""} total
            </p>


          </div>


        </div>




        <ProjectTable
          projects={projects}
        />


      </section>



    </div>
  );
}
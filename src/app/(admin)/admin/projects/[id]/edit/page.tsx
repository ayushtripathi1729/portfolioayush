import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EditProjectForm } from "@/components/admin/projects/edit-project-form";
import { projectService } from "@/services/project.service";


interface EditProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}


export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {

  const { id } = await params;


  const project =
    await projectService.getById(id);



  if (!project) {
    notFound();
  }



  return (
    <div className="space-y-8">


      <section className="flex items-center gap-4">


        <Link href="/admin/projects">

          <Button
            variant="outline"
            size="icon"
          >
            <ArrowLeft className="size-4" />
          </Button>

        </Link>



        <div>

          <h1 className="text-3xl font-bold tracking-tight">
            Edit Project
          </h1>


          <p className="mt-2 text-muted-foreground">
            Update your portfolio project details.
          </p>

        </div>


      </section>




      <EditProjectForm
        project={{
          id: project.id,
          title: project.title,
          slug: project.slug,
          shortDescription:
            project.shortDescription,
          description:
            project.description,

          githubUrl:
            project.githubUrl,

          liveUrl:
            project.liveUrl,

          featured:
            project.featured,

          visible:
            project.visible,

          status:
            project.status,

          displayOrder:
            project.displayOrder,

          categoryId:
            project.categoryId,
        }}
      />


    </div>
  );
}
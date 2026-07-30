import Link from "next/link";
import {
  Plus,
  ExternalLink,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProjectActions } from "./project-actions";
import { ProjectStatusBadge } from "./project-status-badge";


interface ProjectTableProps {
  projects: Array<{
    id: string;
    title: string;
    slug: string;
    status: string;
    featured: boolean;
    visible: boolean;
    githubUrl?: string | null;
    liveUrl?: string | null;
    category?: {
      name: string;
    } | null;
    createdAt: Date;
  }>;
}



export function ProjectTable({
  projects,
}: ProjectTableProps) {


  if (projects.length === 0) {

    return (
      <div className="rounded-xl border p-8 text-center">

        <h3 className="text-lg font-semibold">
          No projects found
        </h3>


        <p className="mt-2 text-sm text-muted-foreground">
          Create your first portfolio project.
        </p>


        <Link href="/admin/projects/new">

          <Button className="mt-5">

            <Plus className="size-4" />

            New Project

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
                Project
              </th>


              <th className="px-5 py-3 font-medium">
                Category
              </th>


              <th className="px-5 py-3 font-medium">
                Status
              </th>


              <th className="px-5 py-3 font-medium">
                Details
              </th>


              <th className="px-5 py-3 font-medium">
                Links
              </th>


              <th className="px-5 py-3 font-medium">
                Actions
              </th>


            </tr>


          </thead>




          <tbody>


            {projects.map((project) => (

              <tr
                key={project.id}
                className="border-b transition-colors hover:bg-muted/30 last:border-0"
              >



                <td className="px-5 py-4">

                  <div className="space-y-1">


                    <div className="flex items-center gap-2">


                      <p className="font-medium">
                        {project.title}
                      </p>



                      {project.featured && (

                        <Star
                          className="size-4 fill-current text-yellow-500"
                        />

                      )}


                    </div>



                    <p className="text-xs text-muted-foreground">
                      /{project.slug}
                    </p>


                  </div>

                </td>





                <td className="px-5 py-4 text-sm">

                  {project.category?.name ??
                    "Uncategorized"}

                </td>





                <td className="px-5 py-4">

                  <ProjectStatusBadge
                    status={project.status}
                  />

                </td>





                <td className="px-5 py-4 text-sm">

                  <div className="space-y-1">


                    <p>
                      {project.visible
                        ? "Visible"
                        : "Hidden"}
                    </p>


                    <p className="text-xs text-muted-foreground">
                      {new Intl.DateTimeFormat(
                        "en-US",
                        {
                          dateStyle:
                            "medium",
                        }
                      ).format(
                        new Date(
                          project.createdAt
                        )
                      )}
                    </p>


                  </div>


                </td>





                <td className="px-5 py-4">


                  <div className="flex gap-2">


                    {project.githubUrl && (

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >

                        <Button
                          variant="outline"
                          size="icon"
                          aria-label="Open GitHub"
                        >

                          <ExternalLink className="size-4" />

                        </Button>


                      </a>

                    )}



                    {project.liveUrl && (

                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >

                        <Button
                          variant="outline"
                          size="icon"
                          aria-label="Open live site"
                        >

                          <ExternalLink className="size-4" />

                        </Button>


                      </a>

                    )}


                  </div>


                </td>





                <td className="px-5 py-4">

                  <ProjectActions
                    id={project.id}
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
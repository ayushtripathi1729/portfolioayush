import Image from "next/image";

import type { Project } from "@/types/portfolio";

import { SectionTitle } from "./section-title";


interface ProjectsSectionProps {
  projects: Project[];
}



export function ProjectsSection({
  projects,
}: ProjectsSectionProps) {


  if (!projects.length) {
    return null;
  }



  return (
    <section className="container mx-auto px-6 py-20">


      <SectionTitle
        title="Projects"
        description="Selected projects, experiments and applications I have built."
      />



      <div className="grid gap-8 md:grid-cols-2">


        {projects.map((project) => (

          <article
            key={project.id}
            className="overflow-hidden rounded-xl border"
          >


            {project.assets.length > 0 && (

              <Image
                src={
                  project.assets[0].asset.url
                }
                alt={project.title}
                width={800}
                height={450}
                className="h-52 w-full object-cover"
              />

            )}



            <div className="space-y-4 p-6">


              <div>

                <p className="text-sm text-muted-foreground">
                  {project.category.name}
                </p>


                <h3 className="mt-1 text-2xl font-semibold">
                  {project.title}
                </h3>

              </div>




              <p className="text-muted-foreground">
                {project.shortDescription}
              </p>




              <div className="flex flex-wrap gap-2">


                {project.technologies.map(
                  ({ technology }) => (

                    <span
                      key={technology.id}
                      className="rounded-full border px-3 py-1 text-sm"
                    >
                      {technology.name}
                    </span>

                  )
                )}


              </div>





              <div className="flex gap-4 pt-2">


                {project.githubUrl && (

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border px-4 py-2 text-sm"
                  >
                    GitHub
                  </a>

                )}



                {project.liveUrl && (

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground"
                  >
                    Live Demo
                  </a>

                )}


              </div>


            </div>


          </article>

        ))}


      </div>


    </section>
  );
}
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
    <section
      className="
      container
      mx-auto
      px-8
      py-28
      lg:px-16
      "
    >


      <SectionTitle
        title="Projects"
        description="Selected systems, experiments and engineering work."
      />




      <div
        className="
        mt-16
        space-y-20
        "
      >



        {projects.map((project, index) => (


          <article
            key={project.id}
            className="
            group
            grid
            gap-10
            border-b
            pb-16
            lg:grid-cols-[80px_1fr_0.8fr]
            "
          >



            {/* NUMBER */}


            <div
              className="
              text-4xl
              font-light
              text-muted-foreground/40
              "
            >

              {String(index + 1).padStart(2, "0")}

            </div>






            {/* CONTENT */}


            <div
              className="
              space-y-6
              "
            >



              <div>


                <p
                  className="
                  text-xs
                  uppercase
                  tracking-[0.35em]
                  text-muted-foreground
                  "
                >
                  {project.category.name}
                </p>




                <h3
                  className="
                  mt-3
                  text-4xl
                  font-semibold
                  tracking-tight
                  transition
                  group-hover:opacity-70
                  "
                >
                  {project.title}
                </h3>


              </div>






              <p
                className="
                max-w-xl
                leading-8
                text-muted-foreground
                "
              >
                {project.shortDescription}
              </p>







              <div
                className="
                flex
                flex-wrap
                gap-3
                "
              >


                {project.technologies.map(
                  ({ technology }) => (

                    <span
                      key={technology.id}
                      className="
                      rounded-full
                      border
                      px-4
                      py-1.5
                      text-xs
                      uppercase
                      tracking-wide
                      transition
                      group-hover:bg-muted
                      "
                    >
                      {technology.name}
                    </span>

                  )
                )}


              </div>






              <div
                className="
                flex
                gap-4
                pt-3
                "
              >


                {project.githubUrl && (

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                    rounded-full
                    border
                    px-6
                    py-2.5
                    text-sm
                    transition
                    hover:bg-muted
                    "
                  >
                    GitHub
                  </a>

                )}




                {project.liveUrl && (

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                    rounded-full
                    bg-foreground
                    px-6
                    py-2.5
                    text-sm
                    text-background
                    transition
                    hover:opacity-80
                    "
                  >
                    Live Demo
                  </a>

                )}


              </div>



            </div>







            {/* IMAGE */}



            <div
              className="
              relative
              overflow-hidden
              rounded-2xl
              border
              aspect-video
              "
            >



              {project.assets.length > 0 ? (


                <Image
                  src={
                    project.assets[0].asset.url
                  }
                  alt={project.title}
                  fill
                  className="
                  object-cover
                  transition
                  duration-500
                  group-hover:scale-105
                  "
                />


              ) : (


                <div
                  className="
                  flex
                  h-full
                  items-center
                  justify-center
                  text-sm
                  text-muted-foreground
                  "
                >
                  Project Preview
                </div>


              )}



            </div>




          </article>


        ))}


      </div>


    </section>
  );
}
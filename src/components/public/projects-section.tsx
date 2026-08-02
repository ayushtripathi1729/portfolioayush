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
      relative
      overflow-hidden
      bg-background
      py-28
      "
    >






      {/* Ambient Glow */}

      <div
        className="
        pointer-events-none
        absolute
        left-0
        top-40
        -z-10
        h-96
        w-96
        rounded-full
        bg-violet-500/10
        blur-3xl
        "
      />









      <div
        className="
        container
        mx-auto
        px-8
        lg:px-16
        "
      >






        <SectionTitle

          title="Projects"

          description="
          Selected systems, experiments and engineering work.
          "

        />









        <div
          className="
          mt-16
          grid
          gap-10
          lg:grid-cols-2
          "
        >






          {
            projects.map(
              (project, index) => (


                <article

                  key={project.id}

                  className="
                  group
                  overflow-hidden
                  rounded-3xl
                  border
                  border-border
                  bg-card
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:border-violet-400/50
                  hover:shadow-xl
                  "

                >







                  {/* IMAGE */}



                  <div
                    className="
                    relative
                    aspect-video
                    overflow-hidden
                    "
                  >




                    {
                      project.assets.length > 0 ? (


                        <Image

                          src={
                            project.assets[0].asset.url
                          }

                          alt={
                            project.title
                          }

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


                      )
                    }





                  </div>









                  {/* CONTENT */}


                  <div
                    className="
                    space-y-6
                    p-8
                    "
                  >






                    <div>


                      <p
                        className="
                        text-xs
                        uppercase
                        tracking-[0.3em]
                        text-violet-600
                        "
                      >

                        {project.category.name}

                      </p>






                      <h3
                        className="
                        mt-3
                        text-3xl
                        font-semibold
                        tracking-tight
                        "
                      >

                        {project.title}

                      </h3>


                    </div>









                    <p
                      className="
                      leading-7
                      text-muted-foreground
                      "
                    >

                      {project.shortDescription}

                    </p>









                    {/* TECHNOLOGIES */}



                    <div
                      className="
                      flex
                      flex-wrap
                      gap-2
                      "
                    >



                      {
                        project.technologies.map(
                          ({
                            technology
                          }) => (


                            <span

                              key={
                                technology.id
                              }

                              className="
                              rounded-full
                              border
                              px-4
                              py-1.5
                              text-xs
                              uppercase
                              tracking-wide
                              text-muted-foreground
                              "

                            >

                              {
                                technology.name
                              }

                            </span>


                          )
                        )
                      }



                    </div>









                    {/* LINKS */}



                    <div
                      className="
                      flex
                      gap-4
                      pt-3
                      "
                    >



                      {
                        project.githubUrl && (


                          <a

                            href={
                              project.githubUrl
                            }

                            target="_blank"

                            rel="noopener noreferrer"

                            className="
                            rounded-full
                            border
                            px-5
                            py-2
                            text-sm
                            transition
                            hover:bg-muted
                            "

                          >

                            GitHub

                          </a>


                        )
                      }








                      {
                        project.liveUrl && (


                          <a

                            href={
                              project.liveUrl
                            }

                            target="_blank"

                            rel="noopener noreferrer"

                            className="
                            rounded-full
                            bg-foreground
                            px-5
                            py-2
                            text-sm
                            text-background
                            transition
                            hover:opacity-80
                            "

                          >

                            Live

                          </a>


                        )
                      }




                    </div>





                  </div>






                </article>


              )
            )
          }







        </div>








      </div>







    </section>

  );

}
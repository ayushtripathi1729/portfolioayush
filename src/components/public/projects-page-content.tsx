import Image from "next/image";
import Link from "next/link";

import {
  GitBranch,
  ExternalLink,
} from "lucide-react";


import type { Project } from "@/types/portfolio";




interface ProjectsPageContentProps {

  projects: Project[];

}







export function ProjectsPageContent({
  projects,
}: ProjectsPageContentProps) {



  if (!projects.length) {

    return null;

  }





  const featuredProjects =
    projects.filter(
      (project) =>
        project.featured
    );





  const otherProjects =
    projects.filter(
      (project) =>
        !project.featured
    );







  return (


    <div
      className="
      bg-background
      "
    >







      {/* HERO */}


      <section
        className="
        max-w-screen-2xl
        mx-auto
        px-8
        pt-32
        pb-24
        lg:px-16
        "
      >



        <p
          className="
          text-sm
          uppercase
          tracking-[0.4em]
          text-primary
          "
        >
          Projects
        </p>





        <h1
          className="
          mt-8
          max-w-none
          text-5xl
          font-semibold
          leading-tight
          tracking-tight
          lg:text-7xl
          "
        >

          Things I have
          <span
            className="
            text-primary
            "
          >
            {" "}built.
          </span>


        </h1>







        <p
          className="
          mt-10
          max-w-3xl
          text-xl
          leading-9
          text-muted-foreground
          "
        >

          A collection of software projects,
          experiments and systems built around
          artificial intelligence, cybersecurity,
          algorithms and modern technologies.

        </p>



      </section>









      {/* FEATURED PROJECTS */}


      {
        featuredProjects.length > 0 && (


          <section
            className="
            max-w-screen-2xl
            mx-auto
            px-8
            pb-20
            lg:px-16
            "
          >


            <h2
              className="
              mb-10
              text-3xl
              font-semibold
              "
            >

              Featured Projects

            </h2>







            <div
              className="
              grid
              gap-10
              "
            >



              {
                featuredProjects.map(
                  (project) => (


                    <ProjectCard
                      key={project.id}
                      project={project}
                      featured
                    />


                  )
                )
              }



            </div>



          </section>


        )
      }









      {/* ALL PROJECTS */}



      {
        otherProjects.length > 0 && (


          <section
            className="
            border-t
            bg-muted/20
            "
          >



            <div
              className="
              max-w-screen-2xl
              mx-auto
              px-8
              py-24
              lg:px-16
              "
            >




              <h2
                className="
                mb-10
                text-3xl
                font-semibold
                "
              >

                Other Projects

              </h2>







              <div
                className="
                grid
                gap-8
                md:grid-cols-2
                "
              >



                {
                  otherProjects.map(
                    (project) => (


                      <ProjectCard

                        key={project.id}

                        project={project}

                      />


                    )
                  )
                }



              </div>




            </div>



          </section>


        )
      }






    </div>


  );

}









function ProjectCard({

  project,

  featured = false,

}: {

  project: Project;

  featured?: boolean;

}) {



  const image =
    project.assets[0]?.asset;






  return (


    <article

      className={`
      overflow-hidden
      rounded-3xl
      border
      bg-card
      transition
      hover:-translate-y-1
      hover:shadow-xl
      ${featured ? "grid lg:grid-cols-2" : ""}
      `}

    >






      {
        image && (

          <div
            className="
            relative
            aspect-video
            overflow-hidden
            bg-muted
            "
          >

            <Image

              src={
                image.url
              }

              alt={
                image.altText ??
                project.title
              }

              fill

              className="
              object-cover
              transition
              duration-500
              hover:scale-105
              "

            />

          </div>

        )
      }








      <div
        className="
        flex
        flex-col
        p-8
        "
      >




        <p
          className="
          text-xs
          uppercase
          tracking-[0.3em]
          text-primary
          "
        >

          {project.category.name}

        </p>






        <Link
            href={`/projects/${project.slug}`}
            >

            <h3
                className="
                mt-4
                text-3xl
                font-semibold
                tracking-tight
                hover:text-primary
                transition
                "
            >

                {project.title}

            </h3>

            </Link>






        <p
          className="
          mt-4
          leading-7
          text-muted-foreground
          "
        >

          {project.shortDescription}

        </p>









        <div
          className="
          mt-6
          flex
          flex-wrap
          gap-2
          "
        >


          {
            project.technologies.map(
              ({
                technology,
              }) => (


                <span

                  key={
                    technology.id
                  }

                  className="
                  rounded-full
                  border
                  px-3
                  py-1
                  text-xs
                  "

                >

                  {technology.name}

                </span>


              )
            )
          }


        </div>









        <div
          className="
          mt-auto
          flex
          gap-4
          pt-8
          "
        >


          {
            project.githubUrl && (

              <Link

                href={
                  project.githubUrl
                }

                target="_blank"
                rel="noopener noreferrer"

                className="
                flex
                items-center
                gap-2
                text-sm
                text-muted-foreground
                hover:text-foreground
                "

              >

                <GitBranch className="size-4" />

                Github

              </Link>

            )
          }







          {
            project.liveUrl && (

              <Link

                href={
                  project.liveUrl
                }

                target="_blank"
                rel="noopener noreferrer"

                className="
                flex
                items-center
                gap-2
                text-sm
                text-muted-foreground
                hover:text-foreground
                "

              >

                <ExternalLink className="size-4" />

                Live Demo

              </Link>

            )
          }




        </div>





      </div>






    </article>


  );

}

import Image from "next/image";
import Link from "next/link";

import {
  ExternalLink,
  GitBranch,
} from "lucide-react";

import type { Project } from "@/types/portfolio";



interface ProjectDetailContentProps {

  project: Project;

}







export function ProjectDetailContent({
  project,
}: ProjectDetailContentProps) {



  const thumbnail =
    project.assets.find(
      (item) =>
        item.isThumbnail
    )?.asset
    ??
    project.assets[0]?.asset;





  const galleryImages =
    project.assets
      .filter(
        (item) =>
          !item.isThumbnail
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
        pb-20
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

          {project.category.name}

        </p>







        <h1

          className="
          mt-8
          max-w-5xl
          text-5xl
          font-semibold
          tracking-tight
          leading-tight
          lg:text-7xl
          "

        >

          <AccentTitle title={project.title} />

        </h1>







        <p

          className="
          mt-8
          max-w-3xl
          text-xl
          leading-9
          text-muted-foreground
          "

        >

          {project.shortDescription}

        </p>









        <div

          className="
          mt-10
          flex
          flex-wrap
          gap-4
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
                rounded-full
                border
                px-5
                py-3
                text-sm
                transition
                hover:bg-muted
                "

              >

                <GitBranch
                  className="size-4"
                />

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
                rounded-full
                bg-foreground
                px-5
                py-3
                text-sm
                text-background
                transition
                hover:opacity-80
                "

              >

                <ExternalLink
                  className="size-4"
                />

                Live Demo

              </Link>

            )
          }



        </div>





      </section>









      {/* COVER IMAGE */}



      {
        thumbnail && (

          <section

            className="
            max-w-screen-2xl
            mx-auto
            px-8
            lg:px-16
            "

          >


            <div

              className="
              relative
              aspect-video
              overflow-hidden
              rounded-3xl
              border
              "

            >


              <Image

                src={
                  thumbnail.url
                }

                alt={
                  thumbnail.altText ??
                  project.title
                }

                fill

                sizes="(max-width: 1536px) 100vw, 1536px"

                priority

                className="
                object-cover
                "

              />


            </div>


          </section>

        )
      }









      {/* DESCRIPTION */}



      <section

        className="
        max-w-4xl
        mx-auto
        px-8
        py-32
        lg:px-0
        "

      >



        <h2

          className="
          text-3xl
          font-semibold
          "

        >

          About the project

        </h2>





        <p

          className="
          mt-8
          whitespace-pre-line
          text-lg
          leading-9
          text-muted-foreground
          "

        >

          {project.description}

        </p>



      </section>









      {/* TECHNOLOGIES */}



      <section

        className="
        border-y
        bg-muted/20
        "

      >



        <div

          className="
          max-w-screen-2xl
          mx-auto
          px-8
          py-20
          lg:px-16
          "

        >



          <h2

            className="
            text-3xl
            font-semibold
            "

          >

            Technologies Used

          </h2>







          <div

            className="
            mt-8
            flex
            flex-wrap
            gap-3
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
                    px-5
                    py-2
                    text-sm
                    "

                  >

                    {technology.name}

                  </span>


                )
              )
            }



          </div>



        </div>



      </section>









      {/* GALLERY */}



      {
        galleryImages.length > 0 && (


          <section

            className="
            max-w-screen-2xl
            mx-auto
            px-8
            py-32
            lg:px-16
            "

          >



            <h2

              className="
              text-3xl
              font-semibold
              "

            >

              Screenshots

            </h2>







            <div

              className="
              mt-10
              grid
              gap-8
              md:grid-cols-2
              "

            >



              {
                galleryImages.map(
                  (
                    item
                  ) => (


                    <div

                      key={
                        item.id
                      }

                      className="
                      overflow-hidden
                      rounded-2xl
                      border
                      "

                    >



                      <div

                        className="
                        relative
                        aspect-video
                        "

                      >

                        <Image

                          src={
                            item.asset.url
                          }

                          alt={
                            item.asset.altText ??
                            project.title
                          }

                          fill

                          sizes="(max-width: 768px) 100vw, 50vw"

                          className="
                          object-cover
                          "

                        />


                      </div>





                      {
                        item.caption && (

                          <p

                            className="
                            px-5
                            py-4
                            text-sm
                            text-muted-foreground
                            "

                          >

                            {item.caption}

                          </p>

                        )
                      }



                    </div>


                  )
                )
              }



            </div>




          </section>


        )
      }






    </div>

  );

}

function AccentTitle({ title }: { title: string }) {
  const words = title.trim().split(/\s+/);
  const accent = words.pop();

  return <>{words.join(" ") && `${words.join(" ")} `}<span className="text-primary">{accent}</span></>;
}

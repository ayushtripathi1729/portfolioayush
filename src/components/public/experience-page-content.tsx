import Image from "next/image";

import type { Experience } from "@/types/portfolio";




interface ExperiencePageContentProps {

  experiences: Experience[];

}








export function ExperiencePageContent({
  experiences,
}: ExperiencePageContentProps) {



  if (!experiences.length) {

    return null;

  }






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

          Experience

        </p>





        <h1

          className="
          mt-8
          max-w-none
          text-5xl
          font-semibold
          tracking-tight
          leading-tight
          lg:text-7xl
          "

        >

          Building,
          <span
            className="
            text-primary
            "
          >
            {" "}learning
          </span>

          {" "}and growing.


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

          A timeline of my professional
          experiences, internships and
          engineering journey.

        </p>



      </section>









      {/* TIMELINE */}


      <section

        className="
        border-y
        bg-muted/20
        "

      >



        <div

          className="
          max-w-5xl
          mx-auto
          px-8
          py-32
          "

        >






          <div

            className="
            space-y-16
            "

          >




            {
              experiences.map(
                (
                  experience
                ) => (



                  <article

                    key={
                      experience.id
                    }

                    className="
                    relative
                    border-l
                    pl-10
                    "

                  >





                    <div

                      className="
                      absolute
                      -left-1.75
                      top-1
                      h-3
                      w-3
                      rounded-full
                      bg-primary
                      "

                    />









                    <div

                      className="
                      flex
                      flex-col
                      gap-8
                      md:flex-row
                      md:items-start
                      "

                    >




                      {
                        experience.companyLogo && (

                          <div

                            className="
                            relative
                            h-20
                            w-20
                            shrink-0
                            overflow-hidden
                            rounded-xl
                            border
                            bg-background
                            "

                          >


                            <Image

                              src={
                                experience.companyLogo.url
                              }

                              alt={
                                experience.company
                              }

                              fill

                              className="
                              object-contain
                              p-3
                              "

                            />


                          </div>

                        )
                      }








                      <div>


                        <p

                          className="
                          text-sm
                          uppercase
                          tracking-[0.3em]
                          text-primary
                          "

                        >

                          {
                            experience.employmentType ??
                            "Experience"
                          }

                        </p>






                        <h2

                          className="
                          mt-3
                          text-3xl
                          font-semibold
                          "

                        >

                          {
                            experience.position
                          }

                        </h2>






                        <p

                          className="
                          mt-2
                          text-lg
                          font-medium
                          "

                        >

                          {
                            experience.company
                          }

                        </p>








                        <p

                          className="
                          mt-2
                          text-sm
                          text-muted-foreground
                          "

                        >

                          {
                            experience.location
                          }

                        </p>







                        <p

                          className="
                          mt-6
                          whitespace-pre-line
                          leading-8
                          text-muted-foreground
                          "

                        >

                          {
                            experience.description
                          }

                        </p>







                      </div>



                    </div>





                  </article>



                )
              )
            }





          </div>





        </div>



      </section>






    </div>

  );

}
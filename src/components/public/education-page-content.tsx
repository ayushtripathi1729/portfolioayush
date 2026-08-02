import Image from "next/image";

import type { Education } from "@/types/portfolio";




interface EducationPageContentProps {

  education: Education[];

}





export function EducationPageContent({
  education,
}: EducationPageContentProps) {


  if (!education.length) {

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
          text-violet-600
          "
        >

          Education

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

          Academic journey
          <span
            className="
            text-violet-600
            "
          >
            {" "}and foundations.
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

          The institutions and learning experiences
          that shaped my understanding of computer
          science, mathematics and technology.

        </p>


      </section>









      {/* EDUCATION TIMELINE */}


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
              education.map(
                (item) => (


                  <article

                    key={
                      item.id
                    }

                    className="
                    rounded-3xl
                    border
                    bg-card
                    p-8
                    transition
                    hover:shadow-xl
                    "

                  >





                    <div
                      className="
                      flex
                      gap-8
                      items-start
                      "
                    >





                      {
                        item.institutionLogo && (

                          <div
                            className="
                            relative
                            hidden
                            h-20
                            w-20
                            shrink-0
                            overflow-hidden
                            rounded-xl
                            border
                            bg-background
                            sm:block
                            "
                          >

                            <Image

                              src={
                                item.institutionLogo.url
                              }

                              alt={
                                item.institution
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
                          text-violet-600
                          "
                        >

                          {item.degree}

                        </p>






                        <h2
                          className="
                          mt-3
                          text-3xl
                          font-semibold
                          "
                        >

                          {item.institution}

                        </h2>






                        {
                          item.branch && (

                            <p
                              className="
                              mt-2
                              text-lg
                              text-muted-foreground
                              "
                            >

                              {item.branch}

                            </p>

                          )
                        }







                        <p
                          className="
                          mt-3
                          text-sm
                          text-muted-foreground
                          "
                        >

                          {
                            item.location
                          }

                        </p>







                        <div
                          className="
                          mt-8
                          grid
                          gap-4
                          sm:grid-cols-2
                          "
                        >



                          <div
                            className="
                            rounded-xl
                            border
                            p-4
                            "
                          >

                            <p
                              className="
                              text-xs
                              uppercase
                              tracking-wider
                              text-muted-foreground
                              "
                            >
                              Grade
                            </p>


                            <p
                              className="
                              mt-2
                              font-semibold
                              "
                            >

                              {
                                item.gradeType
                              }
                              {" "}
                              {
                                item.gradeValue
                              }

                            </p>


                          </div>






                          <div
                            className="
                            rounded-xl
                            border
                            p-4
                            "
                          >

                            <p
                              className="
                              text-xs
                              uppercase
                              tracking-wider
                              text-muted-foreground
                              "
                            >
                              Duration
                            </p>


                            <p
                              className="
                              mt-2
                              font-semibold
                              "
                            >

                              {
                                new Date(
                                  item.startDate
                                ).getFullYear()
                              }

                              {" - "}

                              {
                                item.isCurrent
                                ? "Present"
                                :
                                new Date(
                                  item.endDate!
                                ).getFullYear()
                              }

                            </p>


                          </div>



                        </div>







                        {
                          item.description && (

                            <p
                              className="
                              mt-8
                              leading-8
                              text-muted-foreground
                              "
                            >

                              {
                                item.description
                              }

                            </p>

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





    </div>

  );

}
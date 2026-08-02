import type { Experience } from "@/types/portfolio";

import { SectionTitle } from "./section-title";



interface ExperienceSectionProps {
  experiences: Experience[];
}







export function ExperienceSection({
  experiences,
}: ExperienceSectionProps) {


  if (!experiences.length) {
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
        right-0
        top-20
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

          title="Experience"

          description="
          Professional journey, engineering work and practical applications.
          "

        />









        <div
          className="
          mt-16
          grid
          gap-8
          "
        >







          {
            experiences.map(
              (experience, index) => (


                <article

                  key={experience.id}

                  className="
                  group
                  rounded-3xl
                  border
                  border-border
                  bg-card
                  p-10
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-violet-400/50
                  hover:shadow-lg
                  "

                >







                  <div
                    className="
                    flex
                    flex-col
                    gap-8
                    md:flex-row
                    md:justify-between
                    "
                  >







                    {/* MAIN */}


                    <div
                      className="
                      space-y-5
                      "
                    >






                      <div>





                        <span
                          className="
                          text-sm
                          tracking-[0.3em]
                          text-muted-foreground/50
                          "
                        >

                          {String(index + 1).padStart(2, "0")}

                        </span>








                        <h3
                          className="
                          mt-4
                          text-3xl
                          font-semibold
                          tracking-tight
                          transition
                          group-hover:text-violet-600
                          "
                        >

                          {experience.position}

                        </h3>








                        <p
                          className="
                          mt-2
                          text-xl
                          font-medium
                          "
                        >

                          {experience.company}

                        </p>







                        {
                          experience.location && (

                            <p
                              className="
                              mt-1
                              text-sm
                              text-muted-foreground
                              "
                            >

                              {experience.location}

                            </p>

                          )
                        }





                      </div>









                      <p
                        className="
                        max-w-3xl
                        leading-8
                        text-muted-foreground
                        "
                      >

                        {experience.description}

                      </p>









                      {
                        experience.employmentType && (

                          <span
                            className="
                            inline-flex
                            rounded-full
                            border
                            px-5
                            py-2
                            text-xs
                            uppercase
                            tracking-wider
                            text-muted-foreground
                            "
                          >

                            {experience.employmentType}

                          </span>

                        )
                      }








                    </div>









                    {/* DATE */}



                    <div
                      className="
                      text-sm
                      text-muted-foreground
                      md:text-right
                      "
                    >





                      <p>

                        {experience.startDate.getFullYear()}

                        {" — "}

                        {
                          experience.isCurrent
                            ? "Present"
                            : experience.endDate?.getFullYear()
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

  );

}
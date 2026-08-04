import type { Education } from "@/types/portfolio";

import { SectionTitle } from "./section-title";



interface EducationSectionProps {
  education: Education[];
}





export function EducationSection({
  education,
}: EducationSectionProps) {


  if (!education.length) {
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
        top-20
        -z-10
        h-96
        w-96
        rounded-full
        bg-primary/10
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

          title="Education"

          description="
          Current academic journey and foundation.
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
            education.map(
              (item) => (


                <article

                  key={item.id}

                  className="
                  rounded-3xl
                  border
                  border-border
                  bg-card
                  p-10
                  transition
                  hover:border-primary/50
                  hover:shadow-lg
                  "

                >







                  <div
                    className="
                    flex
                    flex-col
                    gap-8
                    md:flex-row
                    md:items-start
                    md:justify-between
                    "
                  >







                    {/* MAIN INFO */}


                    <div
                      className="
                      space-y-5
                      "
                    >






                      <h3
                        className="
                        text-3xl
                        font-semibold
                        tracking-tight
                        "
                      >

                        {item.institution}

                      </h3>








                      <p
                        className="
                        text-xl
                        font-medium
                        text-primary
                        "
                      >

                        {item.degree}

                        {
                          item.branch &&
                          ` • ${item.branch}`
                        }

                      </p>









                      {
                        item.location && (

                          <p
                            className="
                            text-sm
                            text-muted-foreground
                            "
                          >

                            {item.location}

                          </p>

                        )
                      }









                      {
                        item.description && (

                          <p
                            className="
                            max-w-3xl
                            leading-8
                            text-muted-foreground
                            "
                          >

                            {item.description}

                          </p>

                        )
                      }









                    </div>









                    {/* SIDE INFO */}


                    <div
                      className="
                      flex
                      flex-col
                      gap-4
                      text-sm
                      text-muted-foreground
                      md:text-right
                      "
                    >






                      <div>

                        {item.startDate.getFullYear()}

                        {" — "}

                        {
                          item.endDate
                            ? item.endDate.getFullYear()
                            : "Present"
                        }

                      </div>








                      <div
                        className="
                        inline-flex
                        rounded-full
                        border
                        px-5
                        py-2
                        "
                      >

                        {item.gradeType}:{" "}

                        <span
                          className="
                          ml-2
                          font-semibold
                          text-foreground
                          "
                        >

                          {item.gradeValue}

                        </span>


                      </div>








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
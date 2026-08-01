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
      container
      mx-auto
      px-8
      py-28
      lg:px-16
      "
    >


      <SectionTitle
        title="Experience"
        description="Professional journey, engineering work and practical applications."
      />






      <div
        className="
        mt-16
        space-y-12
        "
      >



        {experiences.map((experience, index) => (


          <article
            key={experience.id}
            className="
            grid
            gap-8
            border-b
            pb-12
            lg:grid-cols-[100px_1fr_180px]
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








            {/* DETAILS */}


            <div
              className="
              space-y-5
              "
            >



              <div>


                <h3
                  className="
                  text-3xl
                  font-semibold
                  tracking-tight
                  "
                >
                  {experience.position}
                </h3>



                <p
                  className="
                  mt-2
                  text-lg
                  text-muted-foreground
                  "
                >
                  {experience.company}
                </p>



                {experience.location && (

                  <p
                    className="
                    mt-1
                    text-sm
                    text-muted-foreground
                    "
                  >
                    {experience.location}
                  </p>

                )}



              </div>







              <p
                className="
                max-w-2xl
                leading-8
                text-muted-foreground
                "
              >
                {experience.description}
              </p>





              {experience.employmentType && (

                <span
                  className="
                  inline-flex
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
                  {experience.employmentType}
                </span>

              )}



            </div>









            {/* DATE */}


            <div
              className="
              text-sm
              text-muted-foreground
              lg:text-right
              "
            >


              <p>

                {experience.startDate.getFullYear()}

                {" — "}

                {experience.isCurrent
                  ? "Present"
                  : experience.endDate?.getFullYear()
                }

              </p>



            </div>




          </article>


        ))}


      </div>



    </section>
  );
}
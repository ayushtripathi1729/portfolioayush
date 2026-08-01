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
      container
      mx-auto
      px-8
      py-28
      lg:px-16
      "
    >



      <SectionTitle
        title="Education"
        description="Academic foundation and qualifications."
      />







      <div
        className="
        mt-16
        space-y-12
        "
      >



        {education.map((item, index) => (


          <article
            key={item.id}
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









            {/* CONTENT */}



            <div
              className="
              space-y-5
              "
            >



              <div>


                {/* INSTITUTION */}


                <h3
                  className="
                  text-3xl
                  font-semibold
                  tracking-tight
                  "
                >
                  {item.institution}
                </h3>




                {/* DEGREE */}


                <p
                  className="
                  mt-3
                  text-2xl
                  font-medium
                  tracking-tight
                  "
                >
                  {item.degree}
                </p>







                {/* BRANCH */}


                {item.branch && (

                  <p
                    className="
                    mt-2
                    text-lg
                    font-medium
                    "
                  >
                    {item.branch}
                  </p>

                )}







                {/* LOCATION */}


                {item.location && (

                  <p
                    className="
                    mt-1
                    text-sm
                    text-muted-foreground
                    "
                  >
                    {item.location}
                  </p>

                )}



              </div>












              {item.description && (

                <p
                  className="
                  max-w-2xl
                  whitespace-pre-line
                  leading-8
                  text-muted-foreground
                  "
                >
                  {item.description}
                </p>

              )}









              <div
                className="
                inline-flex
                rounded-full
                border
                px-5
                py-2
                text-sm
                "
              >

                {item.gradeType}:{" "}

                <span className="ml-2 font-semibold">
                  {item.gradeValue.toString()}
                </span>


              </div>



            </div>









            {/* TIMELINE */}



            <div
              className="
              text-sm
              text-muted-foreground
              lg:text-right
              "
            >

              {item.startDate.getFullYear()}

              {" — "}

              {item.endDate
                ? item.endDate.getFullYear()
                : "Present"
              }


            </div>




          </article>


        ))}



      </div>



    </section>
  );
}
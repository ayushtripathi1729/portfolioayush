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
    <section className="container mx-auto px-6 py-20">


      <SectionTitle
        title="Education"
        description="Academic background and qualifications."
      />



      <div className="space-y-8">


        {education.map((item) => (

          <article
            key={item.id}
            className="rounded-xl border p-6"
          >


            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">


              <div>


                <h3 className="text-2xl font-semibold">
                  {item.degree}
                </h3>


                <p className="text-muted-foreground">
                  {item.institution}
                </p>


                {item.branch && (

                  <p className="text-sm text-muted-foreground">
                    {item.branch}
                  </p>

                )}


                {item.location && (

                  <p className="text-sm text-muted-foreground">
                    {item.location}
                  </p>

                )}


              </div>




              <div className="rounded-lg border px-4 py-2 text-sm">

                {item.gradeType}:{" "}

                <span className="font-semibold">
                  {item.gradeValue}
                </span>

              </div>


            </div>




            <div className="mt-4 text-sm text-muted-foreground">

              {item.startDate.getFullYear()}

              {" - "}

              {item.endDate
                ? item.endDate.getFullYear()
                : "Present"}

            </div>




            {item.description && (

              <p className="mt-5 leading-7 text-muted-foreground">
                {item.description}
              </p>

            )}


          </article>

        ))}


      </div>


    </section>
  );
}
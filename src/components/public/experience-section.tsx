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
    <section className="container mx-auto px-6 py-20">


      <SectionTitle
        title="Experience"
        description="My professional journey and practical experience."
      />



      <div className="space-y-8">


        {experiences.map((experience) => (

          <article
            key={experience.id}
            className="rounded-xl border p-6"
          >


            <div className="flex flex-col justify-between gap-3 md:flex-row">


              <div>

                <h3 className="text-2xl font-semibold">
                  {experience.position}
                </h3>


                <p className="text-muted-foreground">
                  {experience.company}
                </p>


                {experience.location && (

                  <p className="text-sm text-muted-foreground">
                    {experience.location}
                  </p>

                )}

              </div>



              <div className="text-sm text-muted-foreground">

                {experience.isCurrent
                  ? "Present"
                  : experience.endDate?.getFullYear()}


              </div>


            </div>




            <p className="mt-5 leading-7 text-muted-foreground">
              {experience.description}
            </p>



          </article>

        ))}


      </div>


    </section>
  );
}
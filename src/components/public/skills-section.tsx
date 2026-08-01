import type { SkillCategory } from "@/types/portfolio";

import { SectionTitle } from "./section-title";


interface SkillsSectionProps {
  categories: SkillCategory[];
}



export function SkillsSection({
  categories,
}: SkillsSectionProps) {


  if (!categories.length) {
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
        title="Skills"
        description="Technical domains, concepts and technologies I work with."
      />




      <div
        className="
        mt-16
        space-y-12
        "
      >



        {categories.map((category, index) => (


          <article
            key={category.id}
            className="
            grid
            gap-8
            border-b
            pb-12
            lg:grid-cols-[100px_1fr]
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
              space-y-6
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
                  {category.name}
                </h3>




                {category.description && (

                  <p
                    className="
                    mt-3
                    max-w-2xl
                    leading-7
                    text-muted-foreground
                    "
                  >
                    {category.description}
                  </p>

                )}


              </div>









              <div
                className="
                flex
                flex-wrap
                gap-3
                "
              >



                {category.skills.map((skill) => (


                  <span
                    key={skill.id}
                    className="
                    rounded-full
                    border
                    px-5
                    py-2
                    text-sm
                    transition
                    hover:bg-muted
                    "
                  >
                    {skill.name}
                  </span>


                ))}


              </div>



            </div>




          </article>


        ))}



      </div>



    </section>
  );
}
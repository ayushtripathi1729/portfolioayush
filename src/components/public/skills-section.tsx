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
    <section className="container mx-auto px-6 py-20">


      <SectionTitle
        title="Skills"
        description="Technologies and areas I work with."
      />



      <div className="grid gap-8 md:grid-cols-2">


        {categories.map((category) => (

          <div
            key={category.id}
            className="rounded-xl border p-6"
          >


            <h3 className="mb-4 text-xl font-semibold">
              {category.name}
            </h3>



            {category.description && (

              <p className="mb-5 text-sm text-muted-foreground">
                {category.description}
              </p>

            )}



            <div className="flex flex-wrap gap-3">


              {category.skills.map((skill) => (

                <span
                  key={skill.id}
                  className="rounded-full border px-4 py-2 text-sm"
                >

                  {skill.name}

                </span>

              ))}


            </div>


          </div>

        ))}


      </div>


    </section>
  );
}
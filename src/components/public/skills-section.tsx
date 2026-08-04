import type { SkillCategory } from "@/types/portfolio";

import { SectionTitle } from "./section-title";



interface SkillsSectionProps {
  categories: SkillCategory[];
}





function formatLevel(level: string) {

  return level
    .toLowerCase()
    .replace(
      /^./,
      (char) => char.toUpperCase()
    );

}






export function SkillsSection({
  categories,
}: SkillsSectionProps) {


  const visibleCategories =
    categories.filter(
      (category) =>
        category.skills.length > 0
    );



  if (!visibleCategories.length) {
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

          title="Skills"

          description="
          Core technical domains and technologies I actively work with.
          "

        />









        <div
          className="
          mt-16
          grid
          gap-8
          md:grid-cols-2
          "
        >






          {
            visibleCategories.map(
              (
                category,
                index
              ) => (



                <article

                  key={category.id}

                  className="
                  group
                  rounded-2xl
                  border
                  border-border
                  bg-card
                  p-8
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-primary/50
                  hover:shadow-lg
                  "

                >







                  <div
                    className="
                    mb-6
                    flex
                    items-center
                    justify-between
                    "
                  >



                    <span
                      className="
                      text-sm
                      tracking-[0.3em]
                      text-muted-foreground/60
                      "
                    >

                      {String(index + 1).padStart(2, "0")}

                    </span>






                    <span
                      className="
                      h-2
                      w-2
                      rounded-full
                      bg-primary
                      opacity-70
                      transition
                      group-hover:scale-150
                      "
                    />



                  </div>









                  <h3

                    className="
                    text-2xl
                    font-semibold
                    tracking-tight
                    transition
                    group-hover:text-primary
                    "

                  >

                    {category.name}

                  </h3>









                  {
                    category.description && (

                      <p

                        className="
                        mt-3
                        leading-7
                        text-muted-foreground
                        "

                      >

                        {category.description}

                      </p>

                    )
                  }












                  <div

                    className="
                    mt-6
                    grid
                    grid-cols-1
                    gap-3
                    sm:grid-cols-2
                    "

                  >





                    {
                      category.skills.map(
                        (skill) => (



                          <div

                            key={skill.id}

                            className="
                            flex
                            items-center
                            gap-2
                            rounded-xl
                            border
                            border-border
                            px-4
                            py-2
                            text-sm
                            transition
                            hover:border-primary
                            hover:bg-muted
                            last:odd:sm:col-span-2
                            "

                          >


                            <span>

                              {skill.name}

                            </span>




                            {
                              skill.level && (

                                <span
                                  className="
                                  border-l
                                  pl-2
                                  text-xs
                                  uppercase
                                  tracking-wide
                                  text-muted-foreground
                                  "
                                >

                                  {formatLevel(skill.level)}

                                </span>

                              )
                            }




                          </div>



                        )
                      )
                    }




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

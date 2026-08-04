import type { Achievement } from "@/types/portfolio";

import { SectionTitle } from "./section-title";


interface AchievementsSectionProps {
  achievements: Achievement[];
}





export function AchievementsSection({
  achievements,
}: AchievementsSectionProps) {


  if (!achievements.length) {
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

          title="Achievements"

          description="
          Milestones, recognitions and important accomplishments.
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
            achievements.map(
              (
                achievement,
                index
              ) => (


                <article

                  key={achievement.id}

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
                    flex
                    items-start
                    justify-between
                    "
                  >



                    <span
                      className="
                      text-sm
                      tracking-[0.3em]
                      text-muted-foreground/50
                      "
                    >

                      {String(index + 1).padStart(2, "0")}

                    </span>






                    {
                      achievement.issueDate && (

                        <span
                          className="
                          text-sm
                          text-muted-foreground
                          "
                        >

                          {
                            achievement.issueDate
                              .getFullYear()
                          }

                        </span>

                      )
                    }




                  </div>












                  <h3
                    className="
                    mt-6
                    text-2xl
                    font-semibold
                    tracking-tight
                    transition
                    group-hover:text-primary
                    "
                  >

                    {achievement.title}

                  </h3>









                  <div
                    className="
                    mt-3
                    flex
                    flex-wrap
                    gap-2
                    text-sm
                    text-muted-foreground
                    "
                  >



                    {
                      achievement.category && (

                        <span>
                          {achievement.category}
                        </span>

                      )
                    }





                    {
                      achievement.issuer && (

                        <span>
                          • {achievement.issuer}
                        </span>

                      )
                    }



                  </div>









                  {
                    achievement.description && (

                      <p
                        className="
                        mt-5
                        line-clamp-3
                        leading-7
                        text-muted-foreground
                        "
                      >

                        {achievement.description}

                      </p>

                    )
                  }









                  {
                    achievement.credentialUrl && (

                      <a

                        href={
                          achievement.credentialUrl
                        }

                        target="_blank"

                        rel="noopener noreferrer"

                        className="
                        mt-6
                        inline-flex
                        rounded-full
                        border
                        px-5
                        py-2
                        text-sm
                        transition
                        hover:bg-muted
                        "

                      >

                        Verify Credential

                      </a>

                    )
                  }






                </article>


              )
            )
          }






        </div>








      </div>







    </section>

  );

}
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
      container
      mx-auto
      px-8
      py-28
      lg:px-16
      "
    >



      <SectionTitle
        title="Achievements"
        description="Awards, certifications and milestones."
      />








      <div
        className="
        mt-16
        space-y-12
        "
      >



        {achievements.map((achievement, index) => (


          <article
            key={achievement.id}
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



              <h3
                className="
                text-3xl
                font-semibold
                tracking-tight
                "
              >
                {achievement.title}
              </h3>







              <div
                className="
                flex
                flex-wrap
                gap-x-4
                text-sm
                text-muted-foreground
                "
              >



                {achievement.category && (

                  <span>
                    {achievement.category}
                  </span>

                )}



                {achievement.issuer && (

                  <span>
                    • {achievement.issuer}
                  </span>

                )}



              </div>









              {achievement.description && (

                <p
                  className="
                  max-w-3xl
                  whitespace-pre-line
                  leading-8
                  text-muted-foreground
                  "
                >
                  {achievement.description}
                </p>

              )}








              {achievement.credentialUrl && (

                <a
                  href={achievement.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                  inline-flex
                  rounded-full
                  border
                  px-6
                  py-2.5
                  text-sm
                  transition
                  hover:bg-muted
                  "
                >
                  Verify Credential
                </a>

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

              {achievement.issueDate
                ? achievement.issueDate.getFullYear()
                : ""
              }

            </div>





          </article>


        ))}



      </div>



    </section>
  );
}
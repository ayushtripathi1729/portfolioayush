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
    <section className="container mx-auto px-6 py-20">


      <SectionTitle
        title="Achievements"
        description="Awards, certifications and milestones."
      />



      <div className="grid gap-8 md:grid-cols-2">


        {achievements.map((achievement) => (

          <article
            key={achievement.id}
            className="rounded-xl border p-6"
          >


            <h3 className="text-2xl font-semibold">
              {achievement.title}
            </h3>



            {achievement.category && (

              <p className="mt-2 text-sm text-muted-foreground">
                {achievement.category}
              </p>

            )}




            {achievement.issuer && (

              <p className="text-sm text-muted-foreground">
                Issued by {achievement.issuer}
              </p>

            )}





            {achievement.description && (

              <p className="mt-4 leading-7 text-muted-foreground">
                {achievement.description}
              </p>

            )}




            <div className="mt-5 flex gap-3">


              {achievement.credentialUrl && (

                <a
                  href={achievement.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border px-4 py-2 text-sm"
                >
                  Verify Credential
                </a>

              )}



            </div>


          </article>

        ))}


      </div>


    </section>
  );
}
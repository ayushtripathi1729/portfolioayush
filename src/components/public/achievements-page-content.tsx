import Image from "next/image";

import type { Achievement } from "@/types/portfolio";




interface AchievementsPageContentProps {

  achievements: Achievement[];

}







export function AchievementsPageContent({

  achievements,

}: AchievementsPageContentProps) {



  if (!achievements.length) {

    return null;

  }







  const featured =

    achievements.filter(

      item => item.featured

    );






  const normal =

    achievements.filter(

      item => !item.featured

    );







  return (

    <div
      className="
      bg-background
      "
    >







      {/* HERO */}


      <section

        className="
        max-w-screen-2xl
        mx-auto
        px-8
        pt-32
        pb-24
        lg:px-16
        "

      >



        <p

          className="
          text-sm
          uppercase
          tracking-[0.4em]
          text-primary
          "

        >

          Achievements

        </p>







        <h1

          className="
          mt-8
          max-w-none
          text-5xl
          font-semibold
          tracking-tight
          leading-[1.05]
          lg:text-8xl
          "

        >

          Milestones,
          <br />

          achievements
          <span

            className="
            text-primary
            "

          >

            {" "}and recognition.

          </span>


        </h1>







        <p

          className="
          mt-10
          max-w-4xl
          text-xl
          leading-9
          text-muted-foreground
          "

        >

          A collection of accomplishments,
          competitions, certifications and
          moments that shaped my journey.

        </p>



      </section>









      {/* FEATURED */}



      {
        featured.length > 0 && (

          <section

            className="
            max-w-screen-2xl
            mx-auto
            px-8
            pb-20
            lg:px-16
            "

          >



            <h2

              className="
              mb-10
              text-3xl
              font-semibold
              "

            >

              Featured Achievements

            </h2>







            <div

              className="
              grid
              gap-8
              lg:grid-cols-3
              "

            >



              {
                featured.map(

                  achievement => (

                    <AchievementCard

                      key={
                        achievement.id
                      }

                      achievement={
                        achievement
                      }

                    />

                  )

                )
              }



            </div>



          </section>

        )
      }









      {/* ALL ACHIEVEMENTS */}



      {
        normal.length > 0 && (

          <section

            className="
            border-y
            bg-muted/20
            "

          >



            <div

              className="
              max-w-screen-2xl
              mx-auto
              px-8
              py-24
              lg:px-16
              "

            >



              <h2

                className="
                mb-10
                text-3xl
                font-semibold
                "

              >

                All Achievements

              </h2>







              <div

                className="
                grid
                gap-8
                md:grid-cols-2
                "

              >



                {
                  normal.map(

                    achievement => (

                      <AchievementCard

                        key={
                          achievement.id
                        }

                        achievement={
                          achievement
                        }

                      />

                    )

                  )
                }



              </div>



            </div>



          </section>

        )
      }







    </div>

  );

}









function AchievementCard({

  achievement,

}: {

  achievement: Achievement;

}) {



  return (

    <article

      className="
      overflow-hidden
      rounded-3xl
      border
      bg-card
      transition
      hover:-translate-y-1
      hover:shadow-xl
      "

    >





      {
        achievement.image && (

          <div

            className="
            relative
            aspect-video
            "

          >


            <Image

              src={
                achievement.image.url
              }

              alt={

                achievement.image.altText ??

                achievement.title

              }

              fill

              className="
              object-cover
              "

            />


          </div>

        )
      }







      <div

        className="
        p-6
        "

      >



        <h3

          className="
          text-2xl
          font-semibold
          "

        >

          {achievement.title}

        </h3>







        {
          achievement.description && (

            <p

              className="
              mt-4
              leading-7
              text-muted-foreground
              "

            >

              {achievement.description}

            </p>

          )
        }





      </div>





    </article>

  );

}
import Image from "next/image";

import type { PortfolioSetting } from "@/types/portfolio";



interface AboutPageContentProps {
  setting: PortfolioSetting | null;
}





export function AboutPageContent({
  setting,
}: AboutPageContentProps) {


  if (!setting) {
    return null;
  }


  const aboutImage =
    setting.aboutImage ??
    setting.profileImage;



  return (

    <div className="bg-background">





      {/* HERO INTRO */}

      <section
        className="
        max-w-screen-2xl
        mx-auto
        px-8
        pt-28
        pb-24
        lg:px-16
        "
      >



        <div
          className="
          grid
          gap-16
          lg:grid-cols-[1.1fr_0.9fr]
          lg:items-center
          "
        >





          {/* TEXT */}

          <div>


            <p
              className="
              text-sm
              uppercase
              tracking-[0.4em]
              text-primary
              "
            >
              About Me
            </p>





            <h1
              className="
              mt-8
              max-w-4xl
              text-5xl
              font-semibold
              tracking-tight
              leading-[1.05]
              lg:text-7xl
              "
            >

              I build,
              <span
                className="
                text-primary
                "
              >
                {" "}learn,
              </span>

              {" "}and solve problems.


            </h1>






            <p
              className="
              mt-10
              max-w-2xl
              text-xl
              leading-9
              text-muted-foreground
              "
            >

              {
                setting.tagline ??
                "Computer Science engineer exploring algorithms, cybersecurity, artificial intelligence and the mathematics behind technology."
              }

            </p>




          </div>







          {/* IMAGE */}

          {
            aboutImage && (

              <div
                className="
                relative
                mx-auto
                aspect-4/5
                w-full
                max-w-md
                overflow-hidden
                rounded-3xl
                border
                bg-muted
                shadow-xl
                "
              >


                <Image

                  src={
                    aboutImage.url
                  }

                  alt={
                    aboutImage.altText ??
                    "About Ayush"
                  }

                  fill

                  priority

                  className="
                  object-cover
                  "
                />


              </div>

            )
          }





        </div>



      </section>









      {/* PERSONAL STORY */}


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
          grid
          gap-16
          px-8
          py-28
          lg:grid-cols-2
          lg:px-16
          "
        >





          <div>


            <p
              className="
              text-xs
              uppercase
              tracking-[0.35em]
              text-muted-foreground
              "
            >
              My Story
            </p>





            <h2
              className="
              mt-6
              text-4xl
              font-semibold
              tracking-tight
              "
            >

              Curiosity became my journey.

            </h2>


          </div>









          <div
            className="
            space-y-7
            text-lg
            leading-9
            text-muted-foreground
            "
          >



            <p>

              {
                setting.about ??
                "I am a Computer Science student passionate about building technology and understanding the principles behind it."
              }

            </p>





            <p>

              My interests lie at the intersection of
              software engineering, competitive programming,
              cybersecurity, artificial intelligence and
              theoretical computer science.

            </p>





            <p>

              I enjoy breaking complex problems into
              smaller pieces, designing efficient solutions
              and continuously improving my understanding
              of computing.

            </p>



          </div>




        </div>


      </section>









      {/* PHILOSOPHY */}



      <section
        className="
        max-w-screen-2xl
        mx-auto
        px-8
        py-32
        lg:px-16
        "
      >



        <div
          className="
          max-w-4xl
          "
        >



          <p
            className="
            text-xs
            uppercase
            tracking-[0.35em]
            text-primary
            "
          >
            Philosophy
          </p>





          <h2
            className="
            mt-6
            text-4xl
            font-semibold
            leading-tight
            lg:text-6xl
            "
          >

            Understanding first.
            Building second.

          </h2>







          <p
            className="
            mt-8
            text-lg
            leading-9
            text-muted-foreground
            "
          >

            I believe great engineers are not defined only
            by the amount of code they write, but by their
            ability to understand systems, ask better
            questions and create meaningful solutions.

          </p>



        </div>



      </section>









      {/* JOURNEY */}



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
          py-32
          lg:px-16
          "
        >



          <p
            className="
            text-xs
            uppercase
            tracking-[0.35em]
            text-muted-foreground
            "
          >
            Journey
          </p>






          <div
            className="
            mt-14
            space-y-12
            "
          >



            <JourneyItem

              year="2023"

              title="Started Computer Science Journey"

              description="
              Began exploring programming, data structures,
              algorithms and software development.
              "

            />





            <JourneyItem

              year="2025"

              title="Exploring Advanced Computing"

              description="
              Expanded into cybersecurity, artificial
              intelligence, competitive programming and
              deeper computer science concepts.
              "

            />





            <JourneyItem

              year="Now"

              title="Building and Learning"

              description="
              Creating projects, solving problems and
              becoming a better engineer every day.
              "

            />



          </div>




        </div>


      </section>









      {/* CLOSING */}



      <section
        className="
        bg-foreground
        text-background
        "
      >


        <div
          className="
          max-w-screen-2xl
          mx-auto
          px-8
          py-32
          lg:px-16
          "
        >



          <h2
            className="
            max-w-5xl
            text-4xl
            font-semibold
            leading-tight
            lg:text-6xl
            "
          >

            Technology is not just about writing code.
            It is about understanding problems and creating
            solutions that matter.

          </h2>






          <p
            className="
            mt-8
            max-w-2xl
            text-lg
            text-background/60
            "
          >

            The journey never stops. There is always
            something new to learn, build and explore.

          </p>



        </div>


      </section>






    </div>

  );

}









function JourneyItem({
  year,
  title,
  description,
}: {
  year: string;
  title: string;
  description: string;
}) {


  return (

    <div
      className="
      grid
      gap-5
      border-l
      pl-8
      lg:grid-cols-[140px_1fr]
      "
    >


      <span
        className="
        text-xl
        font-semibold
        text-primary
        "
      >

        {year}

      </span>





      <div>


        <h3
          className="
          text-2xl
          font-semibold
          "
        >

          {title}

        </h3>




        <p
          className="
          mt-3
          text-muted-foreground
          "
        >

          {description}

        </p>


      </div>


    </div>

  );

}
import type { PortfolioSetting } from "@/types/portfolio";


interface AboutSectionProps {
  setting: PortfolioSetting | null;
}





export function AboutSection({
  setting,
}: AboutSectionProps) {


  if (!setting) {
    return null;
  }



  return (

    <section
      id="about"
      className="
      relative
      overflow-hidden
      bg-background
      py-24
      "
    >




      {/* Background Accent */}

      <div
        className="
        pointer-events-none
        absolute
        right-0
        top-0
        -z-10
        h-96
        w-96
        rounded-full
        bg-violet-500/10
        blur-3xl
        "
      />





      <div
        className="
        mx-auto
        max-w-350
        px-8
        lg:px-16
        "
      >




        <div
          className="
          grid
          gap-16
          lg:grid-cols-[0.8fr_1.2fr]
          lg:items-start
          "
        >





          {/* TITLE SIDE */}

          <div>

            <p
              className="
              text-xs
              uppercase
              tracking-[0.35em]
              text-violet-600
              "
            >
              About Me
            </p>


            <h2
              className="
              mt-6
              font-serif
              text-5xl
              font-semibold
              tracking-tight
              text-foreground
              "
            >
              Who I am
            </h2>


            <div
              className="
              mt-6
              h-px
              w-32
              bg-violet-500
              "
            />

          </div>







          {/* CONTENT SIDE */}

          <div
            className="
            space-y-8
            "
          >



            <p
              className="
              text-xl
              leading-relaxed
              text-muted-foreground
              "
            >

              {setting.tagline ??
                "Building systems at the intersection of mathematics, algorithms and technology."
              }

            </p>





            <p
              className="
              text-base
              leading-8
              text-muted-foreground
              whitespace-pre-line
              "
            >

              {setting.about ??
                "Computer Science engineer passionate about Competitive Programming, Cybersecurity, Artificial Intelligence and theoretical computer science."
              }

            </p>







            {/* INFORMATION GRID */}

            <div
              className="
              grid
              gap-6
              sm:grid-cols-2
              "
            >





              {
                setting.location && (

                  <div
                    className="
                    rounded-2xl
                    border
                    border-border
                    bg-card
                    p-5
                    "
                  >

                    <p
                      className="
                      text-xs
                      uppercase
                      tracking-[0.25em]
                      text-muted-foreground
                      "
                    >
                      Location
                    </p>


                    <p
                      className="
                      mt-3
                      text-sm
                      font-medium
                      text-foreground
                      "
                    >
                      {setting.location}
                    </p>


                  </div>

                )
              }








              {
                setting.email && (

                  <div
                    className="
                    rounded-2xl
                    border
                    border-border
                    bg-card
                    p-5
                    "
                  >

                    <p
                      className="
                      text-xs
                      uppercase
                      tracking-[0.25em]
                      text-muted-foreground
                      "
                    >
                      Email
                    </p>


                    <p
                      className="
                      mt-3
                      break-all
                      text-sm
                      font-medium
                      text-foreground
                      "
                    >
                      {setting.email}
                    </p>


                  </div>

                )
              }





              {
                setting.phone && (

                  <div
                    className="
                    rounded-2xl
                    border
                    border-border
                    bg-card
                    p-5
                    "
                  >

                    <p
                      className="
                      text-xs
                      uppercase
                      tracking-[0.25em]
                      text-muted-foreground
                      "
                    >
                      Phone
                    </p>


                    <p
                      className="
                      mt-3
                      text-sm
                      font-medium
                      text-foreground
                      "
                    >
                      {setting.phone}
                    </p>


                  </div>

                )
              }





            </div>






          </div>





        </div>




      </div>




    </section>

  );

}
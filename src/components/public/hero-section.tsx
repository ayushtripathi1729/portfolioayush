import type { PortfolioSetting } from "@/types/portfolio";

import { ProfileFlipCard } from "@/components/public/profile-flip-card";



interface HeroSectionProps {
  setting: PortfolioSetting | null;
}



const dots = Array.from({
  length: 16,
});





function DotGrid() {

  return (

    <div
      className="
      grid
      grid-cols-4
      gap-3
      opacity-30
      "
    >

      {
        dots.map((_, index) => (

          <span
            key={index}
            className="
            h-1
            w-1
            rounded-full
            bg-violet-500
            "
          />

        ))
      }

    </div>

  );

}









export function HeroSection({
  setting,
}: HeroSectionProps) {


  if (!setting) {
    return null;
  }





  return (

    <section
      className="
      relative
      overflow-hidden
      bg-background
      "
    >





      {/* Ambient Background */}

      <div
        className="
        pointer-events-none
        absolute
        inset-0
        -z-10
        bg-linear-to-br
        from-background
        via-background
        to-violet-500/10
        "
      />




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
        bg-violet-500/10
        blur-3xl
        "
      />









      <div
        className="
        mx-auto
        max-w-350
        px-8
        py-28
        lg:px-16
        lg:py-36
        "
      >






        <div
          className="
          grid
          items-center
          gap-20
          lg:grid-cols-[1.15fr_0.85fr]
          "
        >







          {/* LEFT CONTENT */}





          <div
            className="
            space-y-10
            "
          >





            <div>


              <p
                className="
                mb-7
                whitespace-nowrap
                text-xs
                uppercase
                tracking-[0.35em]
                text-violet-600
                "
              >

                Theoretical Computer Science • Pure Mathematics • Security Analyst

              </p>






              <h1
                className="
                font-serif
                text-6xl
                font-semibold
                leading-[0.9]
                tracking-tight
                text-foreground
                md:text-8xl
                "
              >

                {setting.fullName}

              </h1>







              <div
                className="
                mt-8
                flex
                flex-col
                gap-4
                "
              >



                <p
                  className="
                  text-lg
                  tracking-wide
                  text-muted-foreground
                  "
                >

                  aka{" "}

                  <span
                    className="
                    font-semibold
                    tracking-[0.25em]
                    text-violet-600
                    "
                  >

                    SHUNYAM

                  </span>

                </p>






                <div
                  className="
                  h-px
                  w-48
                  bg-violet-500
                  "
                />



              </div>


            </div>












            <p
              className="
              max-w-3xl
              text-2xl
              leading-relaxed
              text-muted-foreground
              "
            >

              {
                setting.tagline ??
                "Building systems and solving problems at the intersection of algorithms, mathematics and technology."
              }

            </p>









            <p
              className="
              max-w-xl
              text-base
              leading-8
              text-muted-foreground
              "
            >

              {
                setting.bio ??
                "Computer Science engineer passionate about Competitive Programming, Cybersecurity, Artificial Intelligence and theoretical computer science."
              }

            </p>









            {/* BUTTONS */}


            <div
              className="
              flex
              flex-wrap
              gap-4
              "
            >



              <a
                href={
                  setting.resume?.url ??
                  "/resume.pdf"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="
                rounded-full
                bg-foreground
                px-8
                py-3
                text-sm
                font-medium
                text-background
                shadow-lg
                transition
                hover:scale-105
                "
              >

                Resume

              </a>








              <a
                href="https://github.com/ayushtripathi1729"
                target="_blank"
                rel="noopener noreferrer"
                className="
                rounded-full
                border
                border-border
                px-8
                py-3
                text-sm
                font-medium
                transition
                hover:bg-muted
                "
              >

                GitHub

              </a>








              <a
                href="#contact"
                className="
                rounded-full
                border
                border-border
                px-8
                py-3
                text-sm
                font-medium
                transition
                hover:bg-muted
                "
              >

                Contact

              </a>



            </div>












            {/* METADATA */}


            <div
              className="
              flex
              flex-wrap
              items-center
              gap-x-6
              gap-y-4
              pt-4
              text-[11px]
              uppercase
              tracking-[0.25em]
              text-muted-foreground
              "
            >



              <span>
                Computer Science Engineer
              </span>



              <span className="text-violet-500">
                |
              </span>



              <span>
                Competitive Programmer
              </span>



              <span className="text-violet-500">
                |
              </span>



              <span>
                Mathematical CS
              </span>



            </div>






          </div>




          {/* RIGHT IMAGE SECTION */}


          <div
            className="
            relative
            flex
            items-center
            justify-center
            lg:justify-end
            "
          >






            {/* IMAGE ORBIT WRAPPER */}


            <div
              className="
              relative
              flex
              h-120
              w-120
              items-center
              justify-center
              "
            >







              {/* PURPLE GLOW */}


              <div
                className="
                pointer-events-none
                absolute
                inset-12
                rounded-full
                bg-violet-500/20
                blur-3xl
                "
              />









              {/* TOP RIGHT DOT GRID */}


              <div
                className="
                absolute
                -right-10
                -top-10
                "
              >

                <DotGrid />

              </div>









              {/* BOTTOM LEFT DOT GRID */}


              <div
                className="
                absolute
                -bottom-10
                -left-10
                "
              >

                <DotGrid />

              </div>













              {/* MAIN STATIC ORBIT */}


              <div
                className="
                absolute
                h-104
                w-104
                rounded-full
                border
                border-violet-500/25
                "
              />









              {/* ROTATING DASHED ORBIT */}


              <div
                className="
                absolute
                h-112
                w-md
                rounded-full
                border
                border-dashed
                border-violet-400/40
                animate-[spin_20s_linear_infinite]
                "
              />













              {/* ORBIT PARTICLE SYSTEM */}


              <div
                className="
                absolute
                h-112
                w-md
                animate-[spin_12s_linear_infinite]
                "
              >


                <div
                  className="
                  absolute
                  left-1/2
                  top-0
                  -translate-x-1/2
                  h-4
                  w-4
                  rounded-full
                  bg-violet-600
                  shadow-[0_0_30px_rgba(124,58,237,1)]
                  "
                />



              </div>












              <div
                className="
                absolute
                h-112
                w-wd
                animate-[spin_18s_linear_infinite_reverse]
                "
              >


                <div
                  className="
                  absolute
                  bottom-2
                  left-1/2
                  -translate-x-1/2
                  h-3
                  w-3
                  rounded-full
                  bg-violet-400
                  shadow-[0_0_25px_rgba(167,139,250,1)]
                  "
                />


              </div>













              {/* SMALL ORBIT ARC */}


              <div
                className="
                absolute
                h-124
                w-124
                rounded-full
                border-t
                border-violet-500/40
                rotate-45
                "
              />













              {/* PROFILE FLIP CARD */}


              {
                setting.profileImage && (

                  <ProfileFlipCard

                    src={
                      setting.profileImage.url
                    }

                    alt={
                      setting.fullName
                    }

                  />

                )
              }










            </div>






          </div>







        </div>






      </div>






    </section>

  );

}

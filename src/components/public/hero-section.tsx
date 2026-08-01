import Image from "next/image";

import type { PortfolioSetting } from "@/types/portfolio";


interface HeroSectionProps {
  setting: PortfolioSetting | null;
}



export function HeroSection({
  setting,
}: HeroSectionProps) {


  if (!setting) {
    return null;
  }



  return (
    <section className="relative overflow-hidden">


      {/* Ambient background */}

      <div
        className="
        pointer-events-none
        absolute
        inset-0
        -z-10
        bg-[radial-gradient(circle_at_15%_20%,rgba(99,102,241,0.16),transparent_38%)]
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



          <div className="space-y-10">


            <div>


              <p
                className="
                mb-7
                whitespace-nowrap
                text-xs
                uppercase
                tracking-[0.35em]
                text-muted-foreground
                "
              >
                Theoretical Computer Science • Pure Mathematics • Security Analyst
              </p>






              <h1
                className="
                text-6xl
                font-bold
                leading-[0.9]
                tracking-tight
                md:text-8xl
                "
              >
                {setting.fullName}
              </h1>






              {/* Identity */}

              <div
                className="
                mt-8
                flex
                flex-col
                gap-3
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
                    text-foreground
                    "
                  >
                    SHUNYAM
                  </span>

                </p>




                <div
                  className="
                  h-px
                  w-44
                  bg-foreground/70
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

              {setting.tagline ??
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

              {setting.bio ??
                "Computer Science engineer passionate about Competitive Programming, Cybersecurity, Artificial Intelligence and theoretical computer science."
              }

            </p>









            {/* ACTION BUTTONS */}


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









            {/* Metadata */}

            <div
              className="
              flex
              flex-nowrap
              items-center
              gap-x-8
              overflow-hidden
              overflow-x-auto scrollbar-hide
              gap-y-4
              pt-4
              whitespace-nowrap
              text-[11px]
              uppercase
              tracking-[0.22em]
              text-muted-foreground
              "
            >
              <span>
                Computer Science Engineer
              </span>

              <span>
                Competitive Programmer
              </span>

              <span>
                Mathematical CS
              </span>

            </div>



          </div>









          {/* IMAGE */}



          <div
            className="
            flex
            justify-center
            lg:justify-end
            "
          >



            <div
              className="
              relative
              h-90
              w-90
              rounded-full
              border
              p-4
              shadow-[0_30px_80px_rgba(0,0,0,0.18)]
              md:h-107.5
              md:w-107.5
              "
            >


              <div
                className="
                relative
                h-full
                w-full
                overflow-hidden
                rounded-full
                "
              >


                {setting.profileImage ? (


                  <Image
                    src={setting.profileImage.url}
                    alt={setting.fullName}
                    fill
                    sizes="430px"
                    className="object-cover"
                  />


                ) : (


                  <div
                    className="
                    flex
                    h-full
                    items-center
                    justify-center
                    text-muted-foreground
                    "
                  >
                    No Image
                  </div>


                )}



              </div>


            </div>


          </div>




        </div>


      </div>


    </section>
  );
}
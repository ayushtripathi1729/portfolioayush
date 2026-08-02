import Link from "next/link";

import {
  Mail,
  MapPin,
} from "lucide-react";


import type {
  PortfolioSetting,
  SocialLink,
} from "@/types/portfolio";





interface ContactPageContentProps {

  setting: PortfolioSetting | null;

  socialLinks: SocialLink[];

}







export function ContactPageContent({

  setting,

  socialLinks,

}: ContactPageContentProps) {



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
          text-violet-600
          "

        >

          Contact

        </p>







        <h1

          className="
          mt-8
          max-w-none
          text-5xl
          font-semibold
          tracking-tight
          leading-tight
          lg:text-8xl
          "

        >

          Let&apos;s build
          <br />

          something
          <span

            className="
            text-violet-600
            "

          >

            {" "}great.

          </span>


        </h1>







        <p

          className="
          mt-10
          max-w-3xl
          text-xl
          leading-9
          text-muted-foreground
          "

        >

          Have a project, opportunity or idea?
          Feel free to reach out. I would love
          to discuss technology and collaboration.

        </p>



      </section>









      {/* CONTACT AREA */}



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
          py-24
          lg:grid-cols-2
          lg:px-16
          "

        >







          {/* INFORMATION */}


          <div>


            <h2

              className="
              text-3xl
              font-semibold
              "

            >

              Get in touch

            </h2>







            <div

              className="
              mt-10
              space-y-6
              "

            >



              {
                setting?.email && (

                  <div

                    className="
                    flex
                    items-center
                    gap-4
                    "

                  >

                    <Mail
                      className="size-5"
                    />

                    <Link

                      href={
                        `mailto:${setting.email}`
                      }

                      className="
                      hover:text-violet-600
                      "

                    >

                      {setting.email}

                    </Link>


                  </div>

                )
              }







              {
                setting?.location && (

                  <div

                    className="
                    flex
                    items-center
                    gap-4
                    "

                  >

                    <MapPin
                      className="size-5"
                    />

                    <span>

                      {setting.location}

                    </span>


                  </div>

                )
              }



            </div>








            <div

              className="
              mt-10
              flex
              flex-wrap
              gap-4
              "

            >



              {
                socialLinks.map(

                  social => (

                    <Link

                      key={
                        social.id
                      }

                      href={
                        social.url
                      }

                      target="_blank"

                      className="
                      rounded-full
                      border
                      px-5
                      py-2
                      text-sm
                      hover:bg-muted
                      "

                    >

                      {social.platform}

                    </Link>

                  )

                )
              }



            </div>



          </div>









          {/* FORM */}


          <form

            className="
            space-y-6
            rounded-3xl
            border
            bg-card
            p-8
            "

          >



            <input

              placeholder="Your Name"

              className="
              w-full
              rounded-xl
              border
              bg-transparent
              px-4
              py-3
              "

            />



            <input

              placeholder="Email Address"

              className="
              w-full
              rounded-xl
              border
              bg-transparent
              px-4
              py-3
              "

            />



            <input

              placeholder="Subject"

              className="
              w-full
              rounded-xl
              border
              bg-transparent
              px-4
              py-3
              "

            />



            <textarea

              placeholder="Message"

              className="
              min-h-40
              w-full
              rounded-xl
              border
              bg-transparent
              px-4
              py-3
              "

            />





            <button

              type="submit"

              className="
              rounded-full
              bg-foreground
              px-8
              py-3
              text-background
              "

            >

              Send Message

            </button>



          </form>





        </div>


      </section>







    </div>

  );

}
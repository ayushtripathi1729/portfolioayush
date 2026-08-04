"use client";


import {
  useRef,
  useState,
} from "react";


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



  const [loading,setLoading] =
    useState(false);



  const [success,setSuccess] =
    useState("");



  const [error,setError] =
    useState("");



  const formRef =
    useRef<HTMLFormElement>(null);









  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {


    e.preventDefault();



    setLoading(true);

    setSuccess("");

    setError("");





    const form =
      new FormData(
        e.currentTarget
      );






    const data = {


      name:
        form.get("name"),



      email:
        form.get("email"),



      subject:
        form.get("subject"),



      message:
        form.get("message"),


    };








    try {



      const response =
        await fetch(
          "/api/contact",
          {


            method:
              "POST",



            headers:
            {

              "Content-Type":
                "application/json",

            },



            body:
              JSON.stringify(data),


          }
        );







      const result =
        await response.json();







      if(!response.ok){


        throw new Error(
          result.message ??
          "Failed to send message."
        );


      }








      setSuccess(
        "Your message has been sent successfully."
      );





      formRef.current?.reset();







    } catch(error) {



      setError(

        error instanceof Error
        ?
        error.message
        :
        "Something went wrong."

      );



    } finally {



      setLoading(false);



    }


  }









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


            ref={
              formRef
            }


            onSubmit={
              handleSubmit
            }



            className="
            space-y-6
            rounded-3xl
            border
            bg-card
            p-8
            "


          >




            <input

              name="name"

              required

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

              name="email"

              required

              type="email"

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

              name="subject"

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

              name="message"

              required

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









            {
              success && (

                <p className="text-sm text-green-600">

                  {success}

                </p>

              )
            }








            {
              error && (

                <p className="text-sm text-red-600">

                  {error}

                </p>

              )
            }









            <button


              type="submit"


              disabled={loading}


              className="
              rounded-full
              bg-foreground
              px-8
              py-3
              text-background
              disabled:opacity-50
              "


            >



              {
                loading

                ?

                "Sending..."

                :

                "Send Message"
              }



            </button>





          </form>







        </div>



      </section>







    </div>

  );

}
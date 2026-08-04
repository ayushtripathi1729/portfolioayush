"use client";


import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  Menu,
  X,
} from "lucide-react";

import { ThemeToggle } from "@/components/shared/theme-toggle";





const navItems = [

  {
    label: "Home",
    href: "/",
  },

  {
    label: "About",
    href: "/about",
  },

  {
    label: "Skills",
    href: "/skills",
  },

  {
    label: "Projects",
    href: "/projects",
  },

  {
    label: "Experience",
    href: "/experience",
  },

  {
    label: "Education",
    href: "/education",
  },

  {
    label: "Research",
    href: "/research",
  },

  {
    label: "Achievements",
    href: "/achievements",
  },

  {
    label: "Blog",
    href: "/blog",
  },

  {
    label: "Contact",
    href: "/contact",
  },

];









export function Navbar() {


  const pathname =
    usePathname();



  const [open,setOpen] =
    useState(false);







  return (

    <header

      className="
      sticky
      top-0
      z-50
      border-b
      bg-background/80
      backdrop-blur-xl
      "

    >



      <div

        className="
        container
        mx-auto
        flex
        h-20
        items-center
        justify-between
        px-6
        sm:px-8
        lg:px-16
        "

      >









        {/* BRAND */}


        <Link

          href="/"

          onClick={() => setOpen(false)}

          className="
          flex
          flex-col
          transition
          hover:opacity-80
          "

        >


          <span

            className="
            text-xl
            font-semibold
            tracking-tight
            "

          >

            SHUNYAM

          </span>



          <span

            className="
            text-[10px]
            uppercase
            tracking-[0.35em]
            text-muted-foreground
            "

          >

            Ayush Tripathi

          </span>



        </Link>













        {/* RIGHT SECTION */}



        <div

          className="
          flex
          items-center
          gap-5
          "

        >







          {/* DESKTOP NAV */}


          <nav

            className="
            hidden
            items-center
            gap-5
            xl:flex
            "

          >



            {
              navItems.map(

                item => {


                  const active =
                    item.href === "/"
                    ?
                    pathname === "/"
                    :
                    pathname.startsWith(item.href);





                  return (

                    <Link

                      key={
                        item.href
                      }


                      href={
                        item.href
                      }


                      className={`

                      relative

                      whitespace-nowrap

                      text-sm

                      transition

                      ${
                        active
                        ?
                        "text-foreground"
                        :
                        "text-muted-foreground hover:text-foreground"
                      }

                      `}


                    >


                      {item.label}





                      {
                        active && (

                          <span

                            className="
                            absolute
                            -bottom-2
                            left-0
                            h-0.5
                            w-full
                            bg-primary
                            "

                          />

                        )
                      }




                    </Link>

                  );


                }

              )
            }



          </nav>









          {/* THEME */}


          <ThemeToggle />









          {/* MOBILE BUTTON */}


          <button

            onClick={() =>
              setOpen(!open)
            }

            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"


            className="
            rounded-lg
            border
            p-2
            xl:hidden
            "

          >



            {
              open

              ?

              <X
                className="size-5"
              />

              :

              <Menu
                className="size-5"
              />

            }



          </button>





        </div>






      </div>













      {/* MOBILE MENU */}



      {
        open && (


          <nav
            id="mobile-navigation"

            className="
            border-t
            px-8
            py-6
            xl:hidden
            "

          >



            <div

              className="
              flex
              flex-col
              gap-5
              "

            >



              {
                navItems.map(

                  item => {


                    const active =
                      item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href);





                    return (

                      <Link

                        key={
                          item.href
                        }


                        href={
                          item.href
                        }


                        onClick={() =>
                          setOpen(false)
                        }


                        className={`

                        text-sm

                        transition

                        ${
                          active
                          ?
                          "font-medium text-primary"
                          :
                          "text-muted-foreground"
                        }

                        `}


                      >

                        {item.label}


                      </Link>


                    );


                  }

                )
              }



            </div>



          </nav>


        )
      }







    </header>

  );

}

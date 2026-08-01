import Link from "next/link";

import { ThemeToggle } from "@/components/shared/theme-toggle";


const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Projects",
    href: "#projects",
  },
  {
    label: "Research",
    href: "#research",
  },
  {
    label: "Blog",
    href: "#blog",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];



export function Navbar() {

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
        px-8
        lg:px-16
        "
      >




        {/* BRAND */}


        <Link
          href="/"
          className="
          flex
          flex-col
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








        {/* NAVIGATION + THEME */}


        <div
          className="
          flex
          items-center
          gap-8
          "
        >


          <nav
            className="
            hidden
            items-center
            gap-8
            md:flex
            "
          >

            {navItems.map((item) => (

              <Link
                key={item.label}
                href={item.href}
                className="
                text-sm
                text-muted-foreground
                transition
                hover:text-foreground
                "
              >
                {item.label}
              </Link>

            ))}


          </nav>




          <ThemeToggle />



        </div>




      </div>


    </header>
  );
}
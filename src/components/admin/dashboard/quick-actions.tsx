import Link from "next/link";

import {
  Award,
  BookOpen,
  BriefcaseBusiness,
  Code2,
  FileCode2,
  FolderKanban,
  GraduationCap,
  ImageIcon,
  Mail,
  Plus,
  Settings,
  User,
} from "lucide-react";


import { Button } from "@/components/ui/button";



const actions = [

  {
    title: "New Project",
    description: "Add a portfolio project",
    href: "/admin/projects/new",
    icon: Plus,
  },


  {
    title: "Projects",
    description: "Manage portfolio projects",
    href: "/admin/projects",
    icon: FileCode2,
  },


  {
    title: "Blogs",
    description: "Write and edit articles",
    href: "/admin/blog",
    icon: BookOpen,
  },


  {
    title: "Research",
    description: "Manage publications",
    href: "/admin/research",
    icon: GraduationCap,
  },


  {
    title: "Experience",
    description: "Manage career history",
    href: "/admin/experience",
    icon: BriefcaseBusiness,
  },


  {
    title: "Achievements",
    description: "Awards and certificates",
    href: "/admin/achievements",
    icon: Award,
  },


  {
    title: "Skills",
    description: "Manage technical skills",
    href: "/admin/skills",
    icon: Code2,
  },


  {
    title: "Technologies",
    description: "Manage technology stack",
    href: "/admin/technologies",
    icon: FolderKanban,
  },


  {
    title: "Assets",
    description: "Manage uploaded files",
    href: "/admin/assets",
    icon: ImageIcon,
  },


  {
    title: "Messages",
    description: "View contact messages",
    href: "/admin/contact-messages",
    icon: Mail,
  },


  {
    title: "Profile",
    description: "Update administrator profile",
    href: "/admin/profile",
    icon: User,
  },


  {
    title: "Settings",
    description: "Configure portfolio settings",
    href: "/admin/settings",
    icon: Settings,
  },

];





export function QuickActions() {


  return (

    <div className="rounded-xl border bg-card p-6">


      <div className="mb-6">


        <h2 className="text-lg font-semibold">

          Quick Actions

        </h2>



        <p className="text-sm text-muted-foreground">

          Quickly access common CMS operations.

        </p>


      </div>






      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">


        {
          actions.map(
            (action) => {


              const Icon =
                action.icon;



              return (

                <Link
                  key={action.title}
                  href={action.href}
                >


                  <Button

                    variant="outline"

                    className="
                      flex
                      h-20
                      w-full
                      items-center
                      justify-start
                      gap-4
                      transition
                      hover:bg-muted/50
                    "

                  >


                    <Icon className="size-5 shrink-0" />



                    <div className="text-left">


                      <div className="font-medium">

                        {action.title}

                      </div>



                      <div className="text-xs text-muted-foreground">

                        {action.description}

                      </div>


                    </div>


                  </Button>


                </Link>

              );

            }
          )
        }


      </div>


    </div>

  );

}
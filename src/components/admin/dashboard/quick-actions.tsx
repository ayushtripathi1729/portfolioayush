import Link from "next/link";
import {
  BookOpen,
  BriefcaseBusiness,
  FileCode2,
  GraduationCap,
  Plus,
  Trophy,
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
    description: "Manage all projects",
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
    description: "Professional experience",
    href: "/admin/experience",
    icon: BriefcaseBusiness,
  },
  {
    title: "Achievements",
    description: "Awards and certificates",
    href: "/admin/achievements",
    icon: Trophy,
  },
];

export function QuickActions() {
  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Quick Actions</h2>

        <p className="text-sm text-muted-foreground">
          Jump directly to the most common CMS tasks.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
            >
              <Button
                variant="outline"
                className="flex h-20 w-full items-center justify-start gap-4"
              >
                <Icon className="size-5 shrink-0" />

                <div className="text-left">
                  <div className="font-medium">{action.title}</div>

                  <div className="text-xs text-muted-foreground">
                    {action.description}
                  </div>
                </div>
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
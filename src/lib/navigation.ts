import {
  FolderKanban,
  GraduationCap,
  Briefcase,
  BookOpen,
  FileText,
  ImageIcon,
  Settings,
  LayoutDashboard,
  Award,
  Link,
  Mail,
  Users,
} from "lucide-react";


export const adminNavigation = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },

  {
    title: "Projects",
    href: "/admin/projects",
    icon: FolderKanban,
  },

  {
    title: "Research",
    href: "/admin/research",
    icon: BookOpen,
  },

  {
    title: "Education",
    href: "/admin/education",
    icon: GraduationCap,
  },

  {
    title: "Experience",
    href: "/admin/experience",
    icon: Briefcase,
  },

  {
    title: "Skills",
    href: "/admin/skills",
    icon: GraduationCap,
  },

  {
    title: "Blog",
    href: "/admin/blog",
    icon: FileText,
  },

  {
    title: "Achievements",
    href: "/admin/achievement",
    icon: Award,
  },

  {
    title: "Assets",
    href: "/admin/assets",
    icon: ImageIcon,
  },

  {
    title: "Social Links",
    href: "/admin/social-links",
    icon: Link,
  },

  {
    title: "Contact Messages",
    href: "/admin/contact",
    icon: Mail,
  },

  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },

  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
] as const;
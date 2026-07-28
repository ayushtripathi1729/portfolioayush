"use client";
import {
  FolderKanban,
  GraduationCap,
  Briefcase,
  BookOpen,
  FileText,
  ImageIcon,
  Settings,
  LayoutDashboard,
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
    title: "Assets",
    href: "/admin/assets",
    icon: ImageIcon,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];
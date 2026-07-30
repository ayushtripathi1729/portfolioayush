import {
  BriefcaseBusiness,
  FileCode2,
  GraduationCap,
  Newspaper,
  Code2,
  Award,
  ImageIcon,
  Mail,
} from "lucide-react";

import { StatCard } from "@/components/admin/dashboard/stat-card";


export interface DashboardStatsData {

  projects: number;

  research: number;

  blogs: number;

  experience: number;

  skills: number;

  achievements: number;

  assets: number;

  unreadMessages: number;

}



interface DashboardStatsProps {

  stats: DashboardStatsData;

}



export function DashboardStats({
  stats,
}: DashboardStatsProps) {


  return (

    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">


      <StatCard

        title="Projects"

        value={stats.projects}

        icon={
          <FileCode2 className="size-5" />
        }

        description="Portfolio projects"

      />



      <StatCard

        title="Research"

        value={stats.research}

        icon={
          <GraduationCap className="size-5" />
        }

        description="Research publications"

      />



      <StatCard

        title="Blog Posts"

        value={stats.blogs}

        icon={
          <Newspaper className="size-5" />
        }

        description="Published articles"

      />



      <StatCard

        title="Experience"

        value={stats.experience}

        icon={
          <BriefcaseBusiness className="size-5" />
        }

        description="Career records"

      />



      <StatCard

        title="Skills"

        value={stats.skills}

        icon={
          <Code2 className="size-5" />
        }

        description="Technical skills"

      />



      <StatCard

        title="Achievements"

        value={stats.achievements}

        icon={
          <Award className="size-5" />
        }

        description="Awards and certificates"

      />



      <StatCard

        title="Assets"

        value={stats.assets}

        icon={
          <ImageIcon className="size-5" />
        }

        description="Uploaded files"

      />



      <StatCard

        title="Messages"

        value={stats.unreadMessages}

        icon={
          <Mail className="size-5" />
        }

        description="Unread contact messages"

      />


    </section>

  );

}
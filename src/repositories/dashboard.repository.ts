import { prisma } from "@/lib/prisma";


export interface DashboardStats {

  projects: number;

  research: number;

  blogs: number;

  experience: number;

  skills: number;

  achievements: number;

  assets: number;

  unreadMessages: number;

}



export class DashboardRepository {


  async getStats(): Promise<DashboardStats> {


    const [
      projects,
      research,
      blogs,
      experience,
      skills,
      achievements,
      assets,
      unreadMessages,

    ] = await Promise.all([


      prisma.project.count(),


      prisma.research.count(),


      prisma.blog.count(),


      prisma.experience.count(),


      prisma.skill.count(),


      prisma.achievement.count(),


      prisma.asset.count(),


      prisma.contactMessage.count({

        where: {

          isRead: false,

        },

      }),


    ]);




    return {


      projects,


      research,


      blogs,


      experience,


      skills,


      achievements,


      assets,


      unreadMessages,


    };


  }


}



export const dashboardRepository =
  new DashboardRepository();
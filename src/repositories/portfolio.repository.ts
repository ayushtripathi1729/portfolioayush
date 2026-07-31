import { prisma } from "@/lib/prisma";


export class PortfolioRepository {


  async getPortfolio() {

    const setting =
      await prisma.setting.findFirst({
        where: {
          user: {
            id: {
              not: undefined,
            },
          },
        },

        include: {
          profileImage: true,
          resume: true,

          socialLinks: {
            where: {
              visible: true,
            },
            orderBy: {
              displayOrder: "asc",
            },
          },
        },
      });



    const [
      skills,
      skillCategories,
      projects,
      experiences,
      education,
      research,
      achievements,
      blogs,
    ] =
      await Promise.all([


        prisma.skill.findMany({
          where: {
            visible: true,
          },

          include: {
            category: true,
          },

          orderBy: {
            displayOrder: "asc",
          },
        }),



        prisma.skillCategory.findMany({
          where: {
            visible: true,
          },

          orderBy: {
            displayOrder: "asc",
          },

          include: {
            skills: {
              where: {
                visible: true,
              },

              orderBy: {
                displayOrder: "asc",
              },
            },
          },
        }),




        prisma.project.findMany({
          where: {
            visible: true,
            status: "PUBLISHED",
          },

          orderBy: [
            {
              featured: "desc",
            },
            {
              displayOrder: "asc",
            },
          ],

          include: {
            category: true,

            technologies: {
              include: {
                technology: true,
              },
            },

            assets: {
              include: {
                asset: true,
              },

              orderBy: {
                displayOrder: "asc",
              },
            },
          },
        }),




        prisma.experience.findMany({
          where: {
            visible: true,
          },

          orderBy: {
            displayOrder: "asc",
          },

          include: {
            companyLogo: true,
          },
        }),





        prisma.education.findMany({
          where: {
            visible: true,
          },

          orderBy: {
            displayOrder: "asc",
          },

          include: {
            institutionLogo: true,
          },
        }),





        prisma.research.findMany({
          where: {
            visible: true,
          },

          orderBy: [
            {
              featured: "desc",
            },
            {
              displayOrder: "asc",
            },
          ],

          include: {
            coverImage: true,
            pdfAsset: true,
          },
        }),





        prisma.achievement.findMany({
          where: {
            visible: true,
          },

          orderBy: {
            displayOrder: "asc",
          },

          include: {
            image: true,
          },
        }),





        prisma.blog.findMany({
          where: {
            visible: true,
            published: true,
          },

          orderBy: [
            {
              featured: "desc",
            },
            {
              publishedAt: "desc",
            },
          ],

          include: {
            coverImage: true,
            author: {
              select: {
                name: true,
              },
            },
          },
        }),


      ]);




    return {

      setting,

      skills,

      skillCategories,

      projects,

      experiences,

      education,

      research,

      achievements,

      blogs,

    };

  }

}



export const portfolioRepository =
  new PortfolioRepository();
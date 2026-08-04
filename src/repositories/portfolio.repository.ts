import { prisma } from "@/lib/prisma";



export class PortfolioRepository {


  async getSiteMetadata() {
    return prisma.setting.findFirst({
      select: {
        siteTitle: true,
        siteDescription: true,
        favicon: {
          select: {
            url: true,
          },
        },
        ogImage: {
          select: {
            url: true,
            width: true,
            height: true,
            altText: true,
          },
        },
      },
    });
  }





  async getPortfolio() {


    const setting =
      await prisma.setting.findFirst({

        include: {

          profileImage: true,

          aboutImage: true,

          favicon: true,

          ogImage: true,

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


    ] = await Promise.all([







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













  async getHomepagePortfolio() {


    const setting =
      await prisma.setting.findFirst({

        include: {

          profileImage: true,

          aboutImage: true,

          favicon: true,

          ogImage: true,

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

      skillCategories,

      projects,

      experiences,

      education,

      research,

      achievements,

      blogs,


    ] = await Promise.all([







      // The homepage intentionally highlights featured skills only.

      prisma.skillCategory.findMany({

        where: {

          visible: true,

          featured: true,

        },


        orderBy: {

          displayOrder: "asc",

        },


        include: {

          skills: {

            where: {

              visible: true,

              featured: true,

            },


            orderBy: {

              displayOrder: "asc",

            },


          },

        },

      }),







      // FEATURED PROJECTS

      prisma.project.findMany({

        where: {

          visible: true,

          status: "PUBLISHED",

          featured: true,

        },


        orderBy: {

          displayOrder: "asc",

        },


        take: 6,


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







      // FEATURED EXPERIENCE

      prisma.experience.findMany({

        where: {

          visible: true,

          featured: true,

        },


        orderBy: {

          displayOrder: "asc",

        },


        include: {

          companyLogo: true,

        },

      }),







      // CURRENT EDUCATION

      prisma.education.findMany({

        where: {

          visible: true,

          isCurrent: true,

        },


        orderBy: {

          displayOrder: "asc",

        },


        include: {

          institutionLogo: true,

        },

      }),







      // FEATURED RESEARCH

      prisma.research.findMany({

        where: {

          visible: true,

          featured: true,

        },


        orderBy: {

          displayOrder: "asc",

        },


        take: 3,


        include: {

          coverImage: true,

          pdfAsset: true,

        },

      }),







      // FEATURED ACHIEVEMENTS

      prisma.achievement.findMany({

        where: {

          visible: true,

          featured: true,

        },


        orderBy: {

          displayOrder: "asc",

        },


        take: 6,


        include: {

          image: true,

        },

      }),







      // LATEST BLOGS

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


        take: 3,


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


      skills: [],


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

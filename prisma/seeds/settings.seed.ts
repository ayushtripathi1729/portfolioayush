import type { SeedPrisma } from "./types";


export async function seedSettings(
  prisma: SeedPrisma,
  userId: string
) {
  const existing =
    await prisma.setting.findUnique({
      where: {
        userId,
      },
    });


  if (existing) {
    console.log(
      "Settings already exists"
    );

    return existing;
  }


  const setting =
    await prisma.setting.create({
      data: {
        siteTitle:
          "Ayush Tripathi",

        siteDescription:
          "Computer Science Engineer specializing in AI, Cyber Security and Competitive Programming.",

        fullName:
          "Ayush Tripathi",

        tagline:
          "Building systems at the intersection of AI, Security and Algorithms.",

        bio:
          "Computer Science student passionate about Artificial Intelligence, Cyber Security, Competitive Programming and theoretical computer science.",

        email:
          "admin@ayushtripathi.dev",

        userId,
      },
    });


  console.log(
    "Created settings"
  );


  return setting;
}
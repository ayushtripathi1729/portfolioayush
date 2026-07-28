import type { SeedPrisma } from "./types";


export async function seedProjectCategories(
  prisma: SeedPrisma
) {
  const categories = [
    "Web Development",
    "Artificial Intelligence",
    "Machine Learning",
    "Cyber Security",
    "Research",
    "Systems Programming",
  ];


  for (
    let i = 0;
    i < categories.length;
    i++
  ) {
    const name = categories[i];

    await prisma.projectCategory.upsert({
      where: {
        slug: name
          .toLowerCase()
          .replaceAll(" ", "-"),
      },

      update: {},

      create: {
        name,

        slug: name
          .toLowerCase()
          .replaceAll(" ", "-"),

        displayOrder: i,

        visible: true,
      },
    });
  }


  console.log(
    "Project categories seeded"
  );
}



export async function seedSkillCategories(
  prisma: SeedPrisma
) {
  const categories = [
    "Programming Languages",
    "Frontend Development",
    "Backend Development",
    "Databases",
    "AI ML",
    "Cyber Security",
    "DevOps Tools",
  ];


  const result: Record<
    string,
    {
      id: string;
    }
  > = {};


  for (
    let i = 0;
    i < categories.length;
    i++
  ) {
    const name = categories[i];

    const category =
      await prisma.skillCategory.upsert({
        where: {
          slug: name
            .toLowerCase()
            .replaceAll(" ", "-"),
        },

        update: {},

        create: {
          name,

          slug: name
            .toLowerCase()
            .replaceAll(" ", "-"),

          displayOrder: i,

          visible: true,
        },
      });


    result[name] = {
      id: category.id,
    };
  }


  console.log(
    "Skill categories seeded"
  );


  return result;
}
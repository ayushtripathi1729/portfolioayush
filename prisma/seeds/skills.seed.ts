import { SkillLevel } from "../../generated/prisma/client";

import type { SeedPrisma } from "./types";


type SkillCategoryMap = Record<
  string,
  {
    id: string;
  }
>;


export async function seedSkills(
  prisma: SeedPrisma,
  skillCategories: SkillCategoryMap
) {
  const skills = [
    {
      name: "C++",
      slug: "cpp",
      level: SkillLevel.EXPERT,
      category: "Programming Languages",
    },

    {
      name: "Python",
      slug: "python",
      level: SkillLevel.ADVANCED,
      category: "Programming Languages",
    },

    {
      name: "Rust",
      slug: "rust",
      level: SkillLevel.INTERMEDIATE,
      category: "Programming Languages",
    },

    {
      name: "TypeScript",
      slug: "typescript",
      level: SkillLevel.ADVANCED,
      category: "Programming Languages",
    },


    {
      name: "React",
      slug: "react",
      level: SkillLevel.ADVANCED,
      category: "Frontend Development",
    },

    {
      name: "Next.js",
      slug: "nextjs",
      level: SkillLevel.ADVANCED,
      category: "Frontend Development",
    },


    {
      name: "Node.js",
      slug: "nodejs",
      level: SkillLevel.INTERMEDIATE,
      category: "Backend Development",
    },

    {
      name: "PostgreSQL",
      slug: "postgresql",
      level: SkillLevel.INTERMEDIATE,
      category: "Databases",
    },


    {
      name: "Machine Learning",
      slug: "machine-learning",
      level: SkillLevel.INTERMEDIATE,
      category: "AI ML",
    },

    {
      name: "Deep Learning",
      slug: "deep-learning",
      level: SkillLevel.INTERMEDIATE,
      category: "AI ML",
    },

    {
      name: "Computer Vision",
      slug: "computer-vision",
      level: SkillLevel.INTERMEDIATE,
      category: "AI ML",
    },


    {
      name: "Ethical Hacking",
      slug: "ethical-hacking",
      level: SkillLevel.INTERMEDIATE,
      category: "Cyber Security",
    },

    {
      name: "Penetration Testing",
      slug: "penetration-testing",
      level: SkillLevel.INTERMEDIATE,
      category: "Cyber Security",
    },


    {
      name: "Docker",
      slug: "docker",
      level: SkillLevel.INTERMEDIATE,
      category: "DevOps Tools",
    },

    {
      name: "Linux",
      slug: "linux",
      level: SkillLevel.ADVANCED,
      category: "DevOps Tools",
    },
  ];


  for (
    let i = 0;
    i < skills.length;
    i++
  ) {
    const skill = skills[i];


    const category =
      skillCategories[skill.category];


    if (!category) {
      throw new Error(
        `Missing skill category: ${skill.category}`
      );
    }


    await prisma.skill.upsert({
      where: {
        slug: skill.slug,
      },

      update: {},

      create: {
        name: skill.name,

        slug: skill.slug,

        level: skill.level,

        categoryId: category.id,

        displayOrder: i,

        featured: true,

        visible: true,
      },
    });
  }


  console.log(
    "Skills seeded"
  );
}
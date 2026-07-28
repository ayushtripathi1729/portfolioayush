import type { SeedPrisma } from "./types";


export async function seedTechnologies(
  prisma: SeedPrisma
) {
  const technologies = [
    {
      name: "C++",
      slug: "cpp",
      icon: "cpp",
    },

    {
      name: "Python",
      slug: "python",
      icon: "python",
    },

    {
      name: "Rust",
      slug: "rust",
      icon: "rust",
    },

    {
      name: "Go",
      slug: "go",
      icon: "go",
    },

    {
      name: "TypeScript",
      slug: "typescript",
      icon: "typescript",
    },

    {
      name: "React",
      slug: "react",
      icon: "react",
    },

    {
      name: "Next.js",
      slug: "nextjs",
      icon: "nextjs",
    },

    {
      name: "Node.js",
      slug: "nodejs",
      icon: "nodejs",
    },

    {
      name: "PostgreSQL",
      slug: "postgresql",
      icon: "postgresql",
    },

    {
      name: "Prisma",
      slug: "prisma",
      icon: "prisma",
    },

    {
      name: "Docker",
      slug: "docker",
      icon: "docker",
    },

    {
      name: "Linux",
      slug: "linux",
      icon: "linux",
    },

    {
      name: "PyTorch",
      slug: "pytorch",
      icon: "pytorch",
    },

    {
      name: "TensorFlow",
      slug: "tensorflow",
      icon: "tensorflow",
    },

    {
      name: "OpenCV",
      slug: "opencv",
      icon: "opencv",
    },
  ];


  for (
    let i = 0;
    i < technologies.length;
    i++
  ) {
    const technology =
      technologies[i];


    await prisma.technology.upsert({
      where: {
        slug: technology.slug,
      },

      update: {},

      create: {
        ...technology,

        displayOrder: i,

        visible: true,
      },
    });
  }


  console.log(
    "Technologies seeded"
  );
}
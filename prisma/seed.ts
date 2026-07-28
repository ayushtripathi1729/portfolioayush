import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

import { seedAdmin } from "./seeds/admin.seed";
import { seedSettings } from "./seeds/settings.seed";
import {
  seedProjectCategories,
  seedSkillCategories,
} from "./seeds/categories.seed";
import { seedTechnologies } from "./seeds/technologies.seed";
import { seedSkills } from "./seeds/skills.seed";


const adapter = new PrismaPg({
  connectionString: process.env.DIRECT_URL!,
});


const prisma = new PrismaClient({
  adapter,
});


async function main() {
  console.log("🌱 Starting seed...");


  const admin =
    await seedAdmin(prisma);


  await seedSettings(
    prisma,
    admin.id
  );


  await seedProjectCategories(prisma);


  const skillCategories =
    await seedSkillCategories(prisma);


  await seedTechnologies(prisma);


  await seedSkills(
    prisma,
    skillCategories
  );


  console.log("✅ Seed completed");
}


main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
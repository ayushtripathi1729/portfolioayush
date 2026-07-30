import bcrypt from "bcrypt";

import type { SeedPrisma } from "./types";


export async function seedAdmin(
  prisma: SeedPrisma
) {
  const email =
    process.env.ADMIN_EMAIL;

  const password =
    process.env.ADMIN_PASSWORD;


  if (!email || !password) {
    throw new Error(
      "ADMIN_EMAIL and ADMIN_PASSWORD must be provided in .env"
    );
  }


  const existing =
    await prisma.user.findUnique({
      where: {
        email,
      },
    });


  if (existing) {
    console.log(
      "Admin user already exists"
    );

    return existing;
  }


  const passwordHash =
    await bcrypt.hash(
      password,
      12
    );


  const admin =
    await prisma.user.create({
      data: {
        name:
          "Ayush Tripathi",

        email,

        passwordHash,
      },
    });


  console.log(
    "Admin user created successfully"
  );


  return admin;
}
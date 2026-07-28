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
      "ADMIN_EMAIL and ADMIN_PASSWORD must be set"
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
      "Admin already exists"
    );

    return existing;
  }


  const passwordHash =
    await bcrypt.hash(
      password,
      12
    );


  const user =
    await prisma.user.create({
      data: {
        name:
          "Ayush Tripathi",

        email,

        passwordHash,
      },
    });


  console.log(
    "Created admin user"
  );


  return user;
}
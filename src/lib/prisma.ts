import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function createPrismaClient() {
  // The application performs long-lived ORM queries. Use the direct Neon
  // endpoint when it is configured: it is also the endpoint used for Prisma
  // migrations and avoids failures from an unavailable pooled endpoint.
  const connectionString =
    process.env.DIRECT_URL ??
    process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "A DIRECT_URL or DATABASE_URL environment variable is required."
    );
  }

  const pool = new Pool({
    connectionString,
    // Prevent individual serverless instances from opening an unbounded
    // number of Neon connections while retaining useful request concurrency.
    max: 5,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
  });

  return new PrismaClient({
    adapter: new PrismaPg(pool),
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "warn", "error"]
        : ["error"],
  });
}

export const prisma =
  globalForPrisma.prisma ??
  createPrismaClient();

globalForPrisma.prisma = prisma;

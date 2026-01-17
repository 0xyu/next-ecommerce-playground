import { PrismaClient } from "@prisma/client"
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"
import Database from "better-sqlite3"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

function createPrismaClient() {
  if (typeof window !== "undefined") {
    throw new Error("Prisma Client should not be used in browser")
  }

  const dbUrl = process.env.DATABASE_URL || "file:dev.db";
  let adapter;

  if (dbUrl.startsWith("postgres") || dbUrl.startsWith("postgresql")) {
    console.log("Using PostgreSQL adapter");
    const pool = new pg.Pool({ connectionString: dbUrl })
    adapter = new PrismaPg(pool)
  } else {
    console.log("Using SQLite adapter");
    const filename = dbUrl.replace("file:", "");
    const sqlite = new Database(filename);
    adapter = new PrismaBetterSqlite3({
      url: dbUrl
    });
  }

  return new PrismaClient({ adapter });
}

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

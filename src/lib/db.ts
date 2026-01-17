import { PrismaClient } from "@prisma/client"
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

function createPrismaClient() {
  if (typeof window !== "undefined") {
    throw new Error("Prisma Client should not be used in browser")
  }

  // In a real app, you might use 'pg' adapter for production
  // For this demonstration (and Vercel if using pure Postgres connection string without adapter for now, 
  // but we know we need an adapter), we default to SQLite.

  // NOTE: If deploying to Vercel with Postgres, this code needs to swap adapter based on env.
  // Since we are validating local build now:

  // const dbUrl = process.env.DATABASE_URL || "file:./dev.db"; // This is for schema usually

  // PrismaBetterSqlite3 expects a URL.
  // It seems it usually takes the file path or connection string?
  // Based on types: { url: string } & Options

  // We will assume local sqlite for now as per instructions "default to SQLite (local)".

  const adapter = new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL || "file:dev.db"
  });

  return new PrismaClient({ adapter });
}

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

import prismaPackage from "@prisma/client";

/**
 * @description The Prisma Client for
 * PostgreSQL Prisma ORM
 */
const prisma = new prismaPackage.PrismaClient();

export { prisma };

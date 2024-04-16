import { PrismaClient } from "@prisma/client";
import { env } from "../env.mjs";

const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined;
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
    log: ['query'],
})

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
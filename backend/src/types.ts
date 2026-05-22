import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const createPrisma = (env: { DATABASE_URL: string }) =>
  new PrismaClient({ 
    accelerateUrl: env.DATABASE_URL 
  }).$extends(withAccelerate());
  
export type AppEnvironment = {
  Bindings: { 
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
    prisma: ReturnType<typeof createPrisma>;
  };
};
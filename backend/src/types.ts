import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const createPrisma = (env: { DATABASE_URL: string }) =>
  new PrismaClient({ 
    accelerateUrl: env.DATABASE_URL 
  }).$extends(withAccelerate());

export const hashPassword = async (password: string): Promise<string> => {

  const data = new TextEncoder().encode(password);

  const hashBuffer = await crypto.subtle.digest('SHA-256', data);

  const hashArr = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArr.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
};

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
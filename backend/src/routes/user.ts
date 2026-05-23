import { Hono } from 'hono';
import { Prisma } from "@prisma/client/edge";
import { sign } from 'hono/jwt';
import { AppEnvironment, hashPassword } from '../types';

export const userRouter = new Hono<AppEnvironment>();

userRouter.post('/signup', async (c) => {

  const prisma = c.get('prisma');

  try{
    const body = await c.req.json();
    const hashedPassword = await hashPassword(body.password);
    const user = await prisma.user.create({
      data:{
        email : body.email,
        name : body.name,
        password : hashedPassword
      }
    });

    const token = await sign({id: user.id}, c.env.JWT_SECRET, 'HS256');

    return c.json({
      message : 'User Created',
      jwt: token
    }, 200)

} catch(e: unknown){
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return c.json({ 
        error: "A user with this email already exists" 
      }, 409);
    }

    return c.json({
      error : "Error while signing up"
    }, 403);
  }
});

userRouter.post('/login', async (c) => {
  
  const prisma = c.get('prisma');

  try {
    const body = await c.req.json();
    const hashedAttempt = await hashPassword(body.password);
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password : hashedAttempt
      }
    });

    if (!user) {
      return c.json({ error: "Incorrect Credentials" }, 403);
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET, 'HS256');
    return c.json({ 
      Response: "Logged-in Successfully",
      "jwt" : jwt }, 200
    );
  } catch (e: unknown) {
    return c.json({ error: "Error while signing in" }, 403);
  }

});
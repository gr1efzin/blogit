import { Hono } from 'hono'
import { PrismaClient, Prisma } from "./generated/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from 'hono/jwt'

const createPrisma = (env: { DATABASE_URL: string }) =>
  new PrismaClient({ 
    accelerateUrl: env.DATABASE_URL 
  }).$extends(withAccelerate());

const app = new Hono<{ 
  Bindings: { 
    DATABASE_URL : string,
    JWT_SECRET : string
   },
   Variables : {
		userId: string,
    prisma: ReturnType<typeof createPrisma>
	}
}>();

app.use('*', async (c, next) => {
  const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  c.set('prisma', prisma)
  await next()
})

app.use('/api/v1/blog/*', async (c, next) => {
  const header = c.req.header("Authorization");
  
  if(!header){
    return c.json({
      error : "Your authorization has expired\nPlease log/sign in again"
    }, 403)
  }
  const token = header.split(" ")[1];

  try{
    const payload = await verify(token, c.env.JWT_SECRET, 'HS256');
    if (!payload) {
      c.status(401);
      return c.json({ error: "Unauthorized" });
    }
    c.set('userId', payload.id as string);

  }catch{
    return c.json({ error: "Invalid or expired token" }, 403);
  }
  await next();
})

app.post('/api/v1/signup', async (c) => {

  const prisma = c.get('prisma');

  try{
    const body = await c.req.json();
    const user = await prisma.user.create({
      data:{
        email : body.email,
        name : body.name,
        password : body.password
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
})

app.post('/api/v1/signin', async (c) => {
  
  const prisma = c.get('prisma');

  try {
    const body = await c.req.json();
    const user = await prisma.user.findUnique({
      where: {
        email: body.email
      }
    });

    if (!user) {
      return c.json({ error: "User not found" }, 403);
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET, 'HS256');
    return c.json({ jwt }, 200);

  } catch (e: unknown) {
    return c.json({ error: "Error while signing in" }, 403);
  }

})

app.get('/api/v1/blog/:id', (c) => {
	return c.text('get blog route')
})

app.post('/api/v1/blog', (c) => {

	return c.text('signin route')
})

app.put('/api/v1/blog', (c) => {

	return c.text('signin route')
})



export default app

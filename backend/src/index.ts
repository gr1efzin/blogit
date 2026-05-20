import { Hono } from 'hono'
import { PrismaClient, Prisma } from "./generated/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from 'hono/jwt'

const app = new Hono<{ 
  Bindings: { 
    DATABASE_URL : string,
    JWT_SECRET : string
   }
}>();

app.post('/api/v1/signup', async (c) => {

  const prisma = new PrismaClient({
  accelerateUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

try{
  const body = await c.req.json();
  const user = await prisma.user.create({
    data:{
      email : body.email,
      name : body.name,
      password : body.password
    }
  });

  const token = sign({id: user}, c.env.JWT_SECRET, 'HS256');

  return c.json({
    message : 'User Created',
    jwt: token
  }, 200)
}catch(e: unknown){
  if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
    c.status(409);
    return c.json({ 
      error: "A user with this email already exists" 
    });
  }

  c.status(403);
  return c.json({
    error : "Error while signing up"
  });
}
})

app.post('/api/v1/signin', async (c) => {
	const prisma = new PrismaClient({
		accelerateUrl: c.env.DATABASE_URL	,
	}).$extends(withAccelerate());
  try {
    const body = await c.req.json();
    const user = await prisma.user.findUnique({
      where: {
        email: body.email
      }
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "User not found" });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (e: unknown) {
    c.status(403);
    return c.json({ error: "Error while signing in" });
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

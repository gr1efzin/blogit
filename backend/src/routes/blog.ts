import { Hono } from 'hono';
import { verify } from 'hono/jwt';
import { AppEnvironment } from '../types';
import { createBlogInput, updateBlogInput } from '../validation';

export const blogRouter = new Hono<AppEnvironment>();

blogRouter.use('/*', async (c, next) => {
  const header = c.req.header("Authorization");
  
  if(!header){
    return c.json({
      error : "Your authorization has expired, Please log/sign in again"
    }, 403)
  }
  const token = header.split(" ")[1];

  try{
    const payload = await verify(token, c.env.JWT_SECRET, 'HS256');
    if (!payload) {
      return c.json({ error: "Unauthorized" },401);
    }
    c.set("userId", payload.id as string);

  }catch(e){
    return c.json({ error: "Invalid or expired token" }, 403);
  }
  await next();
})

blogRouter.post('/', async (c) => {
  const body = await c.req.json();

  const { success } = createBlogInput.safeParse(body);
      if(!success){
        return c.json({
          error: "Invalid inputs"
        },422)
      }

  const authorId = c.get("userId")
  const prisma = c.get('prisma');

  try{
  const blog = await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authorId
    }
  })
  return c.json({
    Response : 'Blog has been posted',
    id: blog.id
  }, 201)
}catch(e){
  return c.json({
    error: "Unexpected error occured while posting the blog"
  }, 500)
}
})

blogRouter.put('/', async (c) => {
  const body = await c.req.json();

  const { success } = createBlogInput.safeParse(body);
      if(!success){
        return c.json({
          error: "Invalid inputs"
        },422)
      }

  const prisma = c.get('prisma');
  try{
    const blog = await prisma.blog.update({
      where:{
        id: body.id
      },
      data: {
        title: body.title,
        content: body.content,
      }
    })
    return c.json({
      Response : 'Blog has been updated',
      id: blog.id
    }, 200)
  }catch(e){
    return c.json({
      error : "There was an error while updating the blog"
    }, 500)
  }
})

blogRouter.get('/:id', async (c) => {
  const id = c.req.param('id');
  const prisma = c.get('prisma');

  try{
    const blog = await prisma.blog.findFirst({
      where: {
        id: id
      }
    })
    return c.json({ 
      Response: blog
    }, 200)
  }catch(e){
    return c.json({
      error : "There was an error while fetching blogs"
    }, 500)
    
  }
})

blogRouter.get('/', async (c) => {
  const prisma = c.get('prisma');

  try {
    const blogs = await prisma.blog.findMany();
    return c.json({ "blogs":blogs }, 200);
  } catch(e) {
    return c.json({ error: "Error fetching blogs" }, 500);
  }
})
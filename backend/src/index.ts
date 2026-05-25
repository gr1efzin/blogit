import { Hono } from 'hono';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { AppEnvironment, createPrisma } from './types';
import { cors } from 'hono/cors'

const app = new Hono<AppEnvironment>();

app.use('/*', cors())
app.use('*', async (c, next) => {
  const prisma = createPrisma(c.env);
  
  c.set('prisma', prisma)
  await next()
})

app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);

export default app;
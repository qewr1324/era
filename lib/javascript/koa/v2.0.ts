export function generate(params: any): string {
	return `const Koa = require('koa');
const Router = require('@koa/router');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');

const app = new Koa();
const router = new Router();

app.use(cors());
app.use(bodyParser());
app.use(logger());

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', ms + 'ms');
});

router.get('/', async (ctx) => {
  ctx.body = { message: 'Welcome to Koa API' };
});

router.get('/health', async (ctx) => {
  ctx.body = { status: 'ok', timestamp: new Date().toISOString() };
});

router.get('/api/users', async (ctx) => {
  ctx.body = [
    { id: 1, username: 'john_doe', email: 'john@example.com' },
    { id: 2, username: 'jane_doe', email: 'jane@example.com' },
  ];
});

router.post('/api/users', async (ctx) => {
  const { username, email } = ctx.request.body;
  ctx.status = 201;
  ctx.body = { id: 3, username, email, createdAt: new Date().toISOString() };
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Koa server running on port 3000');
});

module.exports = app;`;
}

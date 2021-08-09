const Router = require('@koa/router');
const router = new Router();

router.get('/class/list', (ctx, next) => {
  // ctx.router available
  ctx.body = `请求：${ctx.method} ${ctx.path}`;
});

module.exports = router
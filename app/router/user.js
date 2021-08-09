const Router = require('@koa/router');
const router = new Router();

const User = require('../modules/user')

router.post('/user/register', async (ctx, next) => {
  // ctx.router available
  const {nickname,openid} = ctx.request.body
  await User.create({
    nickname,
    openid
  })
  ctx.body = ctx.request.body;
});

module.exports = router
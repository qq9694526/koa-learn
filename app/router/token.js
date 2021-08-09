const jwt = require('jsonwebtoken')
const Router = require('@koa/router');
const router = new Router();

const { APPID, SECRET } = require('../../config/index').miniapp

router.post('/token/get', async (ctx, next) => {
  // 生成token
  // var token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256'});
  ctx.body = "success"
});

module.exports = router
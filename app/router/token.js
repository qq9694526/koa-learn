const jwt = require("jsonwebtoken");
const Router = require("@koa/router");
const router = new Router();

const { privateKey, expiresIn } = require("../../config/index").token;
const User = require("../model/user");

const Auth = require("../middleware/auth");

// 生成token
router.post("/token/get", async (ctx, next) => {
  const { openid } = ctx.request.body;
  var token = jwt.sign({ openid }, privateKey, { expiresIn });
  global.$res.success(token);
});

// 验证token
router.post("/token/auth", new Auth().m, async (ctx, next) => {
  global.$res.success({
    openid: ctx.auth.openid,
  });
});

module.exports = router;

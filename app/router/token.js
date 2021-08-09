const jwt = require("jsonwebtoken");
const Router = require("@koa/router");
const router = new Router();

const { privateKey, expiresIn } = require("../../config/index").token;
const User = require("../models/user");


// 生成token
router.post("/token/get", async (ctx, next) => {
  const { openid } = ctx.request.body;
  var token = jwt.sign({ openid }, privateKey, { expiresIn });
  ctx.body = {
    token,
  };
});

// 验证token

module.exports = router;

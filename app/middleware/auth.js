const jwt = require("jsonwebtoken");
const basicAuth = require("basic-auth"); // 获取请求头中的Authorization
const { privateKey } = require("../../config/index").token;

class Auth {
  constructor() {}
  get m() {
    return async (ctx, next) => {
      const { name: token } = basicAuth(ctx.req) || {};
      // 校验非空
      if (!token) {
        global.$res.error("auth", "token不能为空");
      }
      try {
        const result = jwt.verify(token, privateKey) || {};
        ctx.auth = {
          id: result.id,
          openid: result.openid,
        };
      } catch (error) {
        console.log("error name::", error.name);
        if (error.name === "TokenExpiredError") {
          global.$res.error("auth", "token已过期");
        } else {
          global.$res.error("auth", "token不合法");
        }
      }
      await next();
    };
  }
}

module.exports = Auth;
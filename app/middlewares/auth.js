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
        ctx.body = {
          code: 403,
          msg: "token不能为空",
        };
        return 
      }
      try {
        const result = jwt.verify(token, privateKey) || {};
        ctx.auth = {
          openid: result.openid,
        };
        await next();
      } catch (error) {
        console.log("error::", error);
        if (error.name === "TokenExpiredError") {
          ctx.body = {
            code: 403,
            msg: "token已过期",
          };
        } else {
          ctx.body = {
            code: 403,
            msg: "token不合法",
          };
        }
      }
    };
  }
}

module.exports = Auth;
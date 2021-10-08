const { HttpException } = require("../utils/http-response");
// 捕获全局错误并抛到前端
const catchError = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    console.log("error::", error);
    const isHttpException = error instanceof HttpException;
    //会捕获到两种错误：HttpException自定义的错误，和代码错误/程序Error
    if (isHttpException) {
      ctx.body = {
        code: error.code,
        message: error.message,
        request: `${ctx.method} ${ctx.path}`,
        data: error.data,
      };
      ctx.status = error.status;
    } else {
      ctx.body = {
        code: "999999",
        message: "服务器出错",
        request: `${ctx.method} ${ctx.path}`,
      };
      ctx.status = 500;
    }
  }
};

module.exports = catchError;

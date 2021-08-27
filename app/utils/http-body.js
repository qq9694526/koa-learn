// 统一处理http响应
// sucess直接返回data
// error时抛错，交由catch-error中间件统一处理。

// 异常处理类 继承Error
class HttpException extends Error {
  constructor(message = "服务器错误", code = "100000", status = 500, data) {
    super();
    this.code = code;
    this.message = message;
    this.status = status;
    this.data = data;
  }
}

const success = (ctx, data) => {
  ctx.body = {
    code: "000000",
    message: "success",
    data,
  };
  ctx.status = 200;
};

// 参数错误
const paramsError = (message = "参数错误", code = "100001", status = 400) => {
  throw new HttpException(message, code, status);
};

// token验证错误
const authError = (message = "token错误", code = "100002", status = 403) => {
  throw new HttpException(message, code, status);
};

module.exports = {
  HttpException,
  success,
  paramsError,
  authError
};

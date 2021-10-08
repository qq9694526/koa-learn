// http响应方法封装
// 原理：通过throw error抛错，交由catch-error中间件统一设置ctx.body

// 异常处理类 继承Error
class HttpException extends Error {
  constructor(message = "服务器错误", code = "100000", status = 500, data) {
    super();
    this.status = status;
    this.code = code;
    this.message = message;
    this.data = data;
  }
}

// 自定义错误码
const errorDefaultValueMap = new Map([
  ["params", { status: 400, code: "100001", message: "参数错误" }],
  ["auth", { status: 403, code: "100002", message: "token错误" }],
]);

const error = (type, message, code, status) => {
  const defaultValue = errorDefaultValueMap.get(type) || {};
  message = message || defaultValue.message;
  code = code || defaultValue.code;
  status = status || defaultValue.status;
  throw new HttpException(message, code, status);
};

// 成功
const success = (data, message = "success", code = "000000", status = 200) => {
  throw new HttpException(message, code, status, data);
};

module.exports = {
  HttpException,
  error,
  success,
};

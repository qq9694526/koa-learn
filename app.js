const Koa = require("koa");
const Router = require("@koa/router");
const requireDirectory = require("require-directory");
const bodyParser = require("koa-bodyparser"); // 解决ctx.request.body获取不到body内容的问题

const catchError = require("./app/middleware/catch-error"); // 全局异常处理
const config = require("./config/index")
const body = require("./app/utils/http-body");

const app = new Koa();

app.use(bodyParser()).use(catchError);
//静态资源
app.use(require('koa-static')(__dirname + '/static'));

// 路由自动注册
requireDirectory(module, "./app/router", {
  visit: (obj) => {
    if (obj instanceof Router) {
      app.use(obj.routes());
    }
  },
});

// 全局变量
global.$res = body;
global.$config = config

app.listen(3000);

const Koa = require("koa");
const Router = require("@koa/router");
const requireDirectory = require("require-directory");
const bodyParser = require("koa-bodyparser");

const app = new Koa();

// 解决ctx.request.body获取不到body内容的问题
app.use(bodyParser());

// 路由自动注册
requireDirectory(module, "./app/router", {
  visit: (obj) => {
    if (obj instanceof Router) {
      app.use(obj.routes());
    }
  },
});

app.listen(3000);

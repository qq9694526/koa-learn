const Router = require("@koa/router");
const router = new Router();

router.get("/class/list", (ctx, next) => {
  const { pageNum, pageSize } = ctx.query;
  if (!pageNum || !pageSize) {
    global.$res.error("params", "参数错误");
  }
  global.$res.success({ pageNum, pageSize });
});

module.exports = router;

const Router = require("@koa/router");
const router = new Router();

const createSSRApp = require('vue').createSSRApp
const renderToString = require('vue/server-renderere').renderToString

router.get("/ssr", async (ctx, next) => {
  const app = createSSRApp({
    data: () => ({ count: 1 }),
    template: `<button @click="count++">{{ count }}</button>`
  })
  const html = await renderToString(app)
  const result = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Vue SSR Example</title>
    </head>
    <body>
      <div id="app">${html}</div>
    </body>
  </html>
  `
  ctx.body = result
});

module.exports = router;

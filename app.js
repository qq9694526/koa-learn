const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const app = new Koa();


const classic = require('./app/router/class.js')
const user = require('./app/router/user.js')
const token = require('./app/router/token.js')

// require('./app/modules/user')

app
  .use(bodyParser())
  .use(classic.routes())
  .use(user.routes())
  .use(token.routes())


app.use(classic.allowedMethods())

app.listen(3000);
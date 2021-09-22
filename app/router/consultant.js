const Router = require("@koa/router");
const router = new Router();

const Consultant = require("../model/consultant");

router.post("/consultant/add", async (ctx, next) => {
  const { name, avatar, phone, tag } = ctx.request.body;
  // TODO:: 验证
  const result = await Consultant.create({ name, avatar, phone, tag });
  if (result) {
    global.$res.success(ctx, result);
  }
});

router.get("/consultant/list", async (ctx, next) => {
  const result = await Consultant.findAll();
  if (result) {
    global.$res.success(ctx, result);
  }
});

router.post("/consultant/delete", async (ctx, next) => {
  const { id } = ctx.request.body;
  const result = await Consultant.destroy({ 
    where:{
      id
    }
  });
  if (result) {
    global.$res.success(ctx);
  }else{
    global.$res.paramsError("记录不存在");
  }
});

module.exports = router;

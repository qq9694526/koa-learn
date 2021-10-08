const Router = require("@koa/router");
const router = new Router();
const axios = require("axios");

const { APPID, SECRET } = require("../../config/index").miniapp;
const User = require("../model/user");

router.post("/user/reg", async (ctx, next) => {
  const { code: JSCODE } = ctx.request.body;
  // 根据code获取openid
  const { data } = await axios.get(
    `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${JSCODE}&grant_type=authorization_code`
  );
  if (!data.openid) {
    global.$res.success(userinfo.data);
    return;
  }
  // 判断用户是否已存在
  let user = await User.findOne({
    where: {
      openid: data.openid,
    },
  });
  console.log(user);
  if (user) {
    global.$res.success(user);
  } else {
    // 创建用户
    const user = await User.create({
      openid: data.openid,
    });
    global.$res.success(user);
  }
});

module.exports = router;

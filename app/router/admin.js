const jwt = require("jsonwebtoken");
const Router = require("@koa/router");
const router = new Router();
const validate = require("validate.js");
const { privateKey, expiresIn } = require("../../config/index").token;
const bcrypt = require("bcryptjs"); // 密码加解密

const Admin = require("../model/admin");

// 管理员注册
router.post("/admin/reg", async (ctx, next) => {
  const { name, password } = ctx.request.body;
  // 参数校验
  paramsValidate(name, password);
  // 判断用户是否已存在
  let admin = await Admin.findOne({
    where: {
      name,
    },
  });
  if (admin) {
    global.$res.error("params", "用户已存在");
  } else {
    // 创建用户
    const admin = await Admin.create({
      name,
      password,
    });
    global.$res.success(admin);
  }
});

// 管理员登录
router.post("/admin/login", async (ctx, next) => {
  const { name, password } = ctx.request.body;
  // 参数校验
  paramsValidate(name, password);

  const admin = await Admin.findOne({
    where: {
      name,
    },
  });
  if (!admin) {
    global.$res.error("params", "用户不存在");
  }

  // 校验密码
  const correct = bcrypt.compareSync(password, admin.password);
  if (!correct) {
    global.$res.error("params", "密码不正确");
  }

  // 下发token
  const token = jwt.sign({ id: admin.id }, privateKey, { expiresIn });
  admin.setDataValue('token',token)

  global.$res.success(admin);
});

function paramsValidate(name, password) {
  const constraints = {
    name: {
      presence: true,
      length: {
        maximum: 20,
        tooLong: "^账号最大长度为20",
      },
    },
    password: {
      presence: true,
    },
  };
  const error = validate({ name, password }, constraints, {
    format: "flat",
  });
  if (error) {
    global.$res.error("params", error[0]);
  }
}

module.exports = router;

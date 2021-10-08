const Router = require("@koa/router");
const router = new Router();
const validate = require("validate.js");

const Consultant = require("../model/consultant");

router.post("/consultant/add", async (ctx, next) => {
  const { name, avatar, phone, tag } = ctx.request.body;
  //参数校验
  const constraints = {
    name: {
      presence: true,
      length: {
        maximum: 20,
        tooLong: "^姓名最大程度为20",
      },
    },
    avatar: {
      presence: true,
    },
    phone: {
      presence: true,
      format: {
        pattern: /^(?:(?:\+|00)86)?1\d{10}$/,
        flags: "i",
        message: "^手机号码格式不正确",
      },
    },
    tag: {
      presence: true,
    },
  };
  const error = validate({ name, avatar, phone, tag }, constraints, {
    format: "flat",
  });
  if (error) {
    global.$res.error("params", error[0]);
  }

  const result = await Consultant.create({ name, avatar, phone, tag });
  if (result) {
    global.$res.success();
  }
});

router.post("/consultant/update", async (ctx, next) => {
  const { id, name, avatar, phone, tag } = ctx.request.body;
  //参数校验
  if (validate.isEmpty(id)) {
    global.$res.error("params", "id不能为空");
  }
  const constraints = {
    name: {
      length: {
        maximum: 20,
        tooLong: "^姓名最大程度为20",
      },
    },
    phone: {
      format: {
        pattern: /^(?:(?:\+|00)86)?1\d{10}$/,
        flags: "i",
        message: "^手机号码格式不正确",
      },
    },
  };
  const error = validate({ name, avatar, phone, tag }, constraints, {
    format: "flat",
  });
  if (error) {
    global.$res.error("params", error[0]);
  }

  const result = await Consultant.update(
    { name, avatar, phone, tag },
    {
      where: {
        id,
      },
    }
  );
  if (result) {
    global.$res.success();
  }
});

router.get("/consultant/list", async (ctx, next) => {
  const result = await Consultant.findAll();
  if (result) {
    global.$res.success(result);
  }
});

router.post("/consultant/delete", async (ctx, next) => {
  const { id } = ctx.request.body;
  if (validate.isEmpty(id)) {
    global.$res.error("params", "id不能为空");
  }

  const result = await Consultant.destroy({
    where: {
      id,
    },
  });
  if (result) {
    global.$res.success();
  } else {
    global.$res.error("params", "记录不存在");
  }
});

module.exports = router;

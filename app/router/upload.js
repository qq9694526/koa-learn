const path = require("path")
const Router = require("@koa/router");
const router = new Router();
const multer = require('@koa/multer');


//配置    
var storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
      cb(null, path.join(__dirname ,'../../static/imgs'))  //注意路径必须存在
  },
  //修改文件名称
  filename: function (req, file, cb) {
      var fileFormat = (file.originalname).split(".");
      cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})

//文件上传限制
const limits = {
  fields: 10,//非文件字段的数量
  fileSize: 500 * 1024,//文件大小 单位 b
  files: 1//文件数量
}


const upload = multer({
  // storage:'/static/imgs' //在哪里存储文件
  storage,
  limits
});

router.post("/upload-single-file", upload.single('file'), (ctx) => {
  console.log("ctx.request.file", ctx.request.file);
  console.log("ctx.file", ctx.file);
  global.$res.success({
    filename: ctx.file.filename,//返回文件名
    path:ctx.file.path,
  });
});

module.exports = router;

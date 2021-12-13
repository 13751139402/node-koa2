const Router = require("koa-router");

const { auth, hadAdminePermission } = require("../middleware/auth.middleware");
const { validator } = require("../middleware/goods.middleware");
const { upload } = require("../controller/goods.controller");

const router = new Router({ prefix: "/goods" });

// 商品图片上传文件
router.post("/upload", auth, hadAdminePermission, upload);

// 发布商品接口
router.post("/", auth, hadAdminePermission, validator, (ctx) => {
  ctx.body = "发布商品成功";
});
module.exports = router;

const Router = require("koa-router");

const { auth, hadAdminePermission } = require("../middleware/auth.middleware");
const { validator } = require("../middleware/goods.middleware");
const { upload, create, update } = require("../controller/goods.controller");

const router = new Router({ prefix: "/goods" });

// 商品图片上传文件
router.post("/upload", auth, hadAdminePermission, upload);

// 发布商品接口
router.post("/create", auth, hadAdminePermission, validator, create);

// 修改商品
router.put("/:id", auth, hadAdminePermission, validator, update);
module.exports = router;

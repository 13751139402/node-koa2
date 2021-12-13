const Router = require("koa-router");

const { auth, hadAdminePermission } = require("../middleware/auth.middleware");
const { validator } = require("../middleware/goods.middleware");
const {
  upload,
  create,
  update,
  remove,
  restore,
  findAll,
} = require("../controller/goods.controller");

const router = new Router({ prefix: "/goods" });

// 商品图片上传文件
router.post("/upload", auth, hadAdminePermission, upload);

// 发布商品接口
router.post("/create", auth, hadAdminePermission, validator, create);

// 修改商品
router.put("/:id", auth, hadAdminePermission, validator, update);

// // 硬删除接口
// router.delete("/:id", auth, hadAdminePermission, remove);

// 上架
router.post("/:id/off", auth, hadAdminePermission, remove);
// 下架
router.post("/:id/on", auth, hadAdminePermission, restore);

// 获取商品列表
router.get("/", findAll);
module.exports = router;

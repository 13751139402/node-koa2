// 1.导入koa-router
const Router = require("koa-router");

// 中间件
const { auth } = require("../middleware/auth.middleware");
const { validator } = require("../middleware/cart.middleware");

// 控制器
const { add, findAll, update } = require("../controller/cart.controller");

// 2.实例化router对象
const router = new Router({ prefix: "/carts" });

// 3.编写路由规则

// 3.1 添加到购物车接口:登陆，格式
router.post("/add", auth, validator({ goods_id: "number" }), add);

// 3.2 获取购物车列表
router.get("/", auth, findAll);

// 3.3 更新购物车
router.patch(
  "/:id",
  auth,
  validator({
    number: { type: "number", required: false },
    selected: { type: "bool", required: false },
  }),
  update
);

// 3.3 更新购物车
router.patch("/:id", auth);
// 4.导出router对象
module.exports = router;

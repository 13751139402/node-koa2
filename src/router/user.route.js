const Router = require("koa-router");

const {
  userValidator,
  verifyUser,
  bcryptPassword,
  verifyLogin,
} = require("../middleware/user.middleware");
const { register, login } = require("../controller/user.controller");

const router = new Router({ prefix: "/users" });

// 注册接口
// 先使用中间件去验证,如果通过了再走注册流程
router.post("/register", userValidator, verifyUser, bcryptPassword, register);

// 登录接口
router.post("/login", userValidator, verifyLogin, login);
module.exports = router;

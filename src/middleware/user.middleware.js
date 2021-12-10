const bcrypt = require("bcryptjs");
const { getUserInfo } = require("../service/user.service");
const {
  userFormateError,
  userAlreadyExited,
  userRegisterError,
  userNotExited,
  userLoginError,
  invalidPassword,
} = require("../constant/err.type");
const userValidator = async (ctx, next) => {
  // 获取请求数据
  const { user_name, password } = ctx.request.body;
  // 合法性
  if (!user_name || !password) {
    console.error("用户名或密码为空", ctx.request.body);
    ctx.app.emit("error", userFormateError, ctx);
    return;
  }
  await next();
};

const verifyUser = async (ctx, next) => {
  // 获取请求数据
  const { user_name, password } = ctx.request.body;
  let res;
  // 合理性
  try {
    res = await getUserInfo({ user_name });
    if (res) {
      ctx.app.emit("error", userAlreadyExited, ctx);
      console.error("用户名已经存在:", { user_name });
      return;
    }
  } catch (error) {
    ctx.app.emit("error", userRegisterError, ctx);
    return;
  }
  await next();
};

const verifyLogin = async (ctx, next) => {
  // 1.判断用户是否存在（不存在：报错）
  const { user_name, password } = ctx.request.body;
  let res;
  try {
    res = await getUserInfo({ user_name });
    if (!res) {
      console.error("用户名不存在", { user_name });
      ctx.app.emit("error", userNotExited, ctx);
      return;
    }
  } catch (error) {
    console.error(err);
    ctx.app.emit("error", userLoginError, ctx);
    return;
  }
  // 2.密码是否匹配(不匹配:报错)
  console.log(res);
  if (!bcrypt.compareSync(password, res.password)) {
    ctx.app.emit("error", invalidPassword, ctx);
    return;
  }
  await next();
};

// 密码加密中间件
const bcryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body;

  const salt = bcrypt.genSaltSync(10); // 十次加盐, 生成一个盐
  const hash = bcrypt.hashSync(password, salt); // 盐+密码+哈希 等于最终的密文
  ctx.request.body.password = hash;
  await next();
};

module.exports = {
  userValidator,
  verifyUser,
  bcryptPassword,
  verifyLogin,
};

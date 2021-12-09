const { getUserInfo } = require("../service/user.service");
const {
  userFormateError,
  userAlreadyExited,
  userRegisterError,
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
  // 合理性
  try {
    const res = await getUserInfo({ user_name });
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

module.exports = {
  userValidator,
  verifyUser,
};

const userValidator = async (ctx, next) => {
  // 1.获取请求数据
  const { user_name, password } = ctx.request.body;

  // 合法性
  if (!user_name || !password) {
    console.error("用户名或密码为空", ctx.request.body);
    ctx.status = 400;
    ctx.body = {
      code: "10001",
      message: "用户名或者密码为空",
      result: "",
    };
    return;
  }
  // 合理性
  if (getUserInfo({ user_name })) {
    ctx.status = 409;
    ctx.body = {
      code: "10002",
      message: "用户已经存在",
      result: "",
    };
    return;
  }
  next();
};

module.exports = {
  userValidator,
};

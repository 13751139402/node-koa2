const { createUser, getUserInfo } = require("../service/user.service");
class UserController {
  async register(ctx, next) {
    const { user_name, password } = ctx.request.body;
    // 2.操作数据库 如果逻辑过于复杂还要剥离出一个层级service
    try {
      const res = await createUser(user_name, password);
      // 3.返回结果
      ctx.body = {
        code: 0,
        message: "用户注册成功",
        result: {
          id: res.id,
          user_name: res.user_name,
        },
      };
    } catch (error) {
      ctx.app.emit("error", userRegisterError);
    }
  }
  async login(ctx, next) {
    const { user_name } = ctx.request.body;
    ctx.body = `欢迎回来，${user_name}`;
  }
}
module.exports = new UserController();

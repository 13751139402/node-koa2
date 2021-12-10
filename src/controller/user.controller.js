const jwt = require("jsonwebtoken");
const {
  createUser,
  getUserInfo,
  updateById,
} = require("../service/user.service");
const { userRegisterError } = require("../constant/err.type");
const { JWT_SECRET } = require("../config/config.default");
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
    // 1.获取用户信息(在token的playload中,记录id,user_name,id_admin);
    try {
      // 剔除password属性,其他的属性放在resUser对象。
      const { password, ...res } = await getUserInfo({ user_name });
      ctx.body = {
        code: 0,
        message: "用户登陆成功",
        result: {
          // 给用户颁发了一个token(令牌),后续请求会拿token用户认证
          token: jwt.sign(res, JWT_SECRET, {
            expiresIn: "10h", // 过期时间
          }),
        },
      };
    } catch (error) {
      console.error("用户登录失败", err);
      ctx.app.emit("error", userRegisterError);
    }
  }
  async changePassword(ctx, next) {
    // 1.获取数据
    const id = ctx.state.user.id;
    const password = ctx.request.body.password;
    // 2.操作数据库
    if (await updateById({ id, password })) {
      ctx.body = {
        code: 0,
        message: "修改密码成功",
        result: "",
      };
    } else {
      ctx.body = {
        code: "10007",
        message: "修改密码失败",
        result: "",
      };
    }
    // 3.返回结果
  }
}
module.exports = new UserController();

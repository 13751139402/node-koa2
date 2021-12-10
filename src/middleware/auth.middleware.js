const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config/config.default");

const { tokenExpiredError, invalidToken } = require("../constant/err.type");

const auth = async (ctx, next) => {
  // 获取token
  const { authorization } = ctx.request.header;
  const token = authorization.replace("Bearer ", "");
  try {
    // JWT_SECRET是密钥可以解开token中的没过期的playload数据。user中包含了payload的信息（id,user_name,is_admin）
    // 如果过期了会报错,因此这里需要try catch
    ctx.state = {
      user: jwt.verify(token, JWT_SECRET),
    };
  } catch (error) {
    switch (error.name) {
      case "TokenExpiredError":
        console.error("token已过期", error);
        return ctx.app.emit("error", tokenExpiredError, ctx);

      case "JsonWebTokenError":
        console.error("token已过期", error);
        return ctx.app.emit("error", invalidToken, ctx);

      default:
        break;
    }
  }

  await next();
};

module.exports = {
  auth,
};

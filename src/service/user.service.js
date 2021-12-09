const User = require("../model/use.model");

class UserController {
  async createUser(user_name, password) {
    // 插入数据
    const res = await User.create({ user_name, password });
    return res.dataValues;
  }
  async getUserInfo({ id, user_name, password, is_admin }) {
    const whereOpt = {};
    id && Object.assign(whereOpt, { id });
    user_name && Object.assign(whereOpt, { user_name });
    password && Object.assign(whereOpt, { password });
    is_admin && Object.assign(whereOpt, { is_admin });
    User.fineOne({
      attributes: ["id", "user_name", "password", "is_admin"],
      where: whereOpt,
    });
  }
}

// common是按值引用,导出一个对象则所有require的都使用同一个对象
module.exports = new UserController();

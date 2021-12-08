class UserController {
  async createUser(user_name, password) {
    // todo:写入数据库
    return "写入数据库成功";
  }
}

// common是按值引用,导出一个对象则所有require的都使用同一个对象
module.exports = new UserController();

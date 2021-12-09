const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

// 创建模型(Modal zd_user -> zd_users)
// 表名推断: 模型名和表名是不一致的
const User = seq.define("zd_user", {
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    Comment: "用户名,唯一",
  },
  password: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    comment: "密码",
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: "是否为管理员,0:不是(默认)，1:是",
  },
});
// 强制同步数据库(创建数据表)
// User.sync({ force: true });
module.exports = User;

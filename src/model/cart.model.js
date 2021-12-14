// 1.导入sequelize的连接
const { DataTypes } = require("sequelize");
const seq = require("../db/seq");
const Goods = require("./goods.model");

// 2.定义Cart模型
const Cart = seq.define("zd_carts", {
  goods_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "商品的id",
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "用户的id",
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: "商品的数量",
  },
  selected: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    comment: "是否选中",
  },
});

// 3.同步数据（建表）
// Cart.sync({ force: true });

// 外键=其他表的id,可以通过外键获取关联的信息
// Cart表中存着Goods表的id,所以Cart存放“外键”,Cart的外键belongTo(属于)Goods
Cart.belongsTo(Goods, {
  foreignKey: "goods_id",
  as: "goods_info",
});

// 4.导出Cart模型
module.exports = Cart;

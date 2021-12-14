const { Op } = require("sequelize");
const Cart = require("../model/cart.model");
const Goods = require("../model/goods.model");
class CartService {
  async createOrUpdate({ user_id, goods_id }) {
    // 根据user_id和goods_id同时查找，有没有记录
    console.log(user_id, goods_id);
    let res = await Cart.findOne({
      where: {
        [Op.and]: {
          user_id,
          goods_id,
        },
      },
    });
    console.log(res);
    if (res) {
      // 已经存在一条记录,number+1
      await res.increment("number");
      // 先等待number更新以后，再返回重载后的结果
      return await res.reload();
    } else {
      return await Cart.create({
        user_id,
        goods_id,
      });
    }
  }
  async findCarts(pageNum, pageSize) {
    const offset = (pageNum - 1) * pageSize;
    const { count, rows } = await Cart.findAndCountAll({
      attributes: ["id", "number", "selected"],
      offset,
      limit: Number(pageSize),
      include: {
        model: Goods,
        attributes: ["id", "goods_name", "goods_price", "goods_img"],
        as: "goods_info",
      }, // 关联表
    });

    return {
      pageNum,
      pageSize,
      total: count,
      list: rows,
    };
  }
  async updateCarts({ id, number, selected }) {
    const res = await Cart.findByPk(id);
    if (!res) {
      return "";
    }
    number !== undefined ? (res.number = number) : "";
    selected !== undefined ? (res.selected = selected) : "";
    return await res.save(); // 更新数据库
  }
}

module.exports = new CartService();

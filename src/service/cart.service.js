const { Op } = require("sequelize");
const Cart = require("../model/cart.model");
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
}

module.exports = new CartService();

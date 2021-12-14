const { createOrUpdate } = require("../service/cart.service");
class CartController {
  async add(ctx) {
    // 将商品添加到购物车
    // 1. 解析user_id,goods_id
    const user_id = ctx.state.user.id;
    const goods_id = ctx.request.body.goods_id;
    ctx.body = "adas";
    // 2.操作数据
    try {
      const res = await createOrUpdate({ user_id, goods_id });
      // 3.返回结果
      ctx.body = {
        code: 0,
        message: "添加到购物车成功",
        result: res,
      };
    } catch (error) {
      console.error(error);
    }
  }
}
module.exports = new CartController();

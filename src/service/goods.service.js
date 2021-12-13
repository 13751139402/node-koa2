const Goods = require("../model/goods.model");

class GoodsService {
  async createGoods(goods) {
    const res = await Goods.create(goods);
    return res.dataValues;
  }
  async updateGoods(id, goods) {
    const res = await Goods.update(goods, { where: { id } });
    return !!res[0];
  }
  async removeGoods(id) {
    // 偏执表调用destroy时不会delete，而是update deletedAt为当前时间
    // deletedAt为真时下架，为假时上架
    const res = await Goods.destroy({ where: { id } });
    return res;
  }
  async restoreGoods(id) {
    // 商品上架 更新deletedAt为null
    const res = await Goods.restore({ where: { id } });
    return res;
  }
  async findGoods(pageNum, pageSize) {
    const offset = (pageNum - 1) * pageSize; // 偏移量
    // // 1.获取总数
    // const total = await Goods.count();
    // // 2.获取分页数据
    // const rows = await Goods.findAll({ offset, limit: Number(pageSize) });
    const { count, rows } = await Goods.findAndCountAll({
      offset,
      limit: Number(pageSize),
    });
    return {
      pageNum,
      pageSize,
      total: count,
      list: rows,
    };
  }
}

module.exports = new GoodsService();

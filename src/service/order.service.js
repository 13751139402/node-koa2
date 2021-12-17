const Order = require("../model/order.model");
class OrderService {
  async createOrder(order) {
    return await Order.create(order);
  }
  async findAllOrder(pageNum, pageSize, status) {
    const { count, rows } = await Order.findAndCountAll({
      where: {
        status,
      },
      offset: (pageNum - 1) * pageSize,
      limit: pageSize * 1,
    });

    return {
      pageNum,
      pageSize,
      total: count,
      list: rows,
    };
  }
}

module.exports = new OrderService();

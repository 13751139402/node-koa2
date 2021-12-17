const {
  createAddr,
  findAllAddr,
  updateAddr,
  removeAddr,
  setDefault,
} = require("../service/addr.service");
class AddrController {
  async create(ctx) {
    try {
      // 解析user_id,consignee,phone,address
      const user_id = ctx.state.user.id;
      const { consignee, phone, address } = ctx.request.body;

      const res = await createAddr({ user_id, consignee, phone, address });

      ctx.body = {
        code: 0,
        message: "添加地址成功",
        result: res,
      };
    } catch (error) {
      console.error(error);
    }
  }
  async findAll(ctx) {
    const user_id = ctx.state.user.id;
    const res = await findAllAddr(user_id);

    ctx.body = {
      code: 0,
      message: "获取列表成功",
      result: res,
    };
  }
  async update(ctx) {
    const id = ctx.request.params.id;
    // const { consignee, phone, address } = ctx.request.body;
    const res = await updateAddr(id, ctx.request.body);
    ctx.body = {
      code: 0,
      message: "更新地址成功",
      result: res,
    };
  }
  async remove(ctx) {
    const id = ctx.request.params.id;
    const res = await removeAddr(id);
    ctx.body = {
      code: 0,
      message: "删除成功",
      result: res,
    };
  }
  async setDefault(ctx) {
    try {
      const user_id = ctx.state.user.id;
      const id = ctx.request.params.id;
      const res = await setDefault(user_id, id);
      ctx.body = {
        code: 0,
        message: "设置默认成功",
        result: res,
      };
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = new AddrController();
const fs = require("fs");

const Router = require("koa-router");
const router = new Router();

// 拿到当前路径的文件名
fs.readdirSync(__dirname).forEach((file) => {
  if (file !== "index.js") {
    const r = require("./" + file);
    router.use(r.routes());
  }
});

module.exports = router;

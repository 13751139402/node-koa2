const Koa = require("koa");
const koaBody = require("koa-body");

const errHandler = require("./errHandler");

const router = require("../router");

const app = new Koa();

app.use(koaBody());
app.use(router.routes());
// 不支持的请求方式会报501错误：没有实现
app.use(router.allowedMethods());
// 统一的错误处理
app.on("error", errHandler);

module.exports = app;

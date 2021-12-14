const path = require("path");

const Koa = require("koa");
const koaBody = require("koa-body");
const koaStatic = require("koa-static");
const parameter = require("koa-parameter");

const errHandler = require("./errHandler");

const router = require("../router");

const app = new Koa();

const uploadPath = path.join(__dirname, "../upload");
app.use(
  koaBody({
    multipart: true, // 开启文件上传功能
    formidable: {
      // 文件保留的路径,不推荐使用相对路径
      // 在option里的相对路径，不是相对的当前文件，相对process.cwd(),这个脚步在哪执行就相对于哪里
      // path.join(__dirname)
      uploadDir: uploadPath,
      keepExtensions: true, // 是否要保留文件扩展名
    },
    parsedMethods: ["POST", "PUT", "PATCH", "DELETE"], //delete默认不把body数据挂载到ctx.request.body中，这里设置一下
  })
);
app.use(koaStatic(uploadPath));
app.use(parameter(app));
app.use(router.routes());
// 不支持的请求方式会报501错误：没有实现
app.use(router.allowedMethods());
// 统一的错误处理
app.on("error", errHandler);

module.exports = app;

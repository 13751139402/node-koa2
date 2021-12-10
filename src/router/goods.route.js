const Router = require("koa-router");

const { auth, hadAdminePermission } = require("../middleware/auth.middleware");

const { upload } = require("../controller/goods.controller");

const router = new Router({ prefix: "/goods" });

router.post("/upload", auth, hadAdminePermission, upload);

module.exports = router;

const router = require("express").Router();
const { getAllUsers, userSelf } = require("./user.controller");
const { authRole } = require('../../middlewares/jwt');

router.get("/", authRole(['admin']), getAllUsers);
router.get("/:id", authRole(['user']), userSelf);

module.exports = router;
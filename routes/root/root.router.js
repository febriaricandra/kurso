const express = require("express");
const router = express.Router();

const { root } = require("./root.contoller");

router.route("/").get(root);

module.exports = router;

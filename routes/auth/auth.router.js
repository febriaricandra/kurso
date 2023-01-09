const  router = require("express").Router();
const {signup, signin} = require("./auth.controller");

router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;
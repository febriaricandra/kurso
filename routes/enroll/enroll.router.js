const { enrollCourse } = require("./enroll.controller");
const router = require("express").Router({ mergeParams: true });

router.post("/:userId", enrollCourse);

module.exports = router;
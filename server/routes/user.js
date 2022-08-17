const express = require("express");
const router = express();

const { signup, signin } = require("../controllers/user");

router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;

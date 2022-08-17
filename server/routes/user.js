const express = require("express");
const router = express();

const { signup } = require("../controllers/user");

router.post("/signup", signup);

module.exports = router;

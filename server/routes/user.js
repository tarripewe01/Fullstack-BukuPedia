const express = require("express");
const router = express.Router();

const { signup, signin, getUsers, deleteUser } = require("../controllers/user");

router.post("/signup", signup);
router.post("/signin", signin);

router.get("/users", getUsers);
router.delete("/users/:id", deleteUser);

module.exports = router;

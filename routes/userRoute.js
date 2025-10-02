const express = require("express");
const router = express.Router();
const { getUsers, createUser } = require("../controllers/userController");

// Định nghĩa route
router.get("/", getUsers);
router.post("/", createUser);

module.exports = router;

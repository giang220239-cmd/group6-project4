// routes/userRoute.js
const express = require("express");
const router = express.Router();
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// GET: lấy danh sách user
router.get("/", getUsers);

// POST: tạo mới user
router.post("/", createUser);

// PUT: cập nhật user theo id
router.put("/:id", updateUser);

// DELETE: xóa user theo id
router.delete("/:id", deleteUser);

module.exports = router;

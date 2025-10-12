// routes/userRoute.js
const express = require("express");
const router = express.Router();

// Import controllers
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// Import middleware
const { auth, adminAuth, ownerOrAdminAuth } = require("../middleware/auth");

// GET: lấy danh sách user (chỉ Admin)
router.get("/", auth, adminAuth, getUsers);

// POST: tạo mới user (chỉ Admin)
router.post("/", auth, adminAuth, createUser);

// PUT: cập nhật user theo id (Owner hoặc Admin)
router.put("/:id", auth, ownerOrAdminAuth, updateUser);

// DELETE: xóa user theo id (Owner hoặc Admin)
router.delete("/:id", deleteUser);

module.exports = router;

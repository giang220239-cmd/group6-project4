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

<<<<<<< HEAD
// GET: lấy danh sách user (chỉ Admin)
router.get("/", auth, adminAuth, getUsers);

// POST: tạo mới user (chỉ Admin)
router.post("/", auth, adminAuth, createUser);

=======
// GET: lấy danh sách user (Public tạm thời để test frontend)
router.get("/", getUsers);

// GET: lấy danh sách user với quyền Admin
router.get("/admin", auth, adminAuth, getUsers);

// POST: tạo mới user (Admin only)
router.post("/", auth, adminAuth, createUser);

// Test endpoint without any middleware (for development)
router.post("/test", (req, res) => {
  res.json({ success: true, message: "Test endpoint works!", body: req.body });
});

>>>>>>> database
// PUT: cập nhật user theo id (Owner hoặc Admin)
router.put("/:id", auth, ownerOrAdminAuth, updateUser);

// DELETE: xóa user theo id (Owner hoặc Admin)
<<<<<<< HEAD
router.delete("/:id", deleteUser);
=======
router.delete("/:id", auth, ownerOrAdminAuth, deleteUser);
>>>>>>> database

module.exports = router;

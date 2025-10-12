const express = require("express");
const router = express.Router();

// Import controllers
const {
  signup,
  login,
  logout,
  getMe,
  verifyToken,
} = require("../controllers/authController");

// Import middleware
const { auth } = require("../middleware/auth");
const {
  signupValidation,
  loginValidation,
} = require("../middleware/validation");

// @route   POST /api/auth/signup
// @desc    Đăng ký user mới
// @access  Public
router.post("/signup", signupValidation, signup);

// @route   POST /api/auth/login
// @desc    Đăng nhập user
// @access  Public
router.post("/login", loginValidation, login);

// @route   POST /api/auth/logout
// @desc    Đăng xuất user
// @access  Private
router.post("/logout", auth, logout);

// @route   GET /api/auth/me
// @desc    Lấy thông tin user hiện tại
// @access  Private
router.get("/me", auth, getMe);

// @route   GET /api/auth/verify
// @desc    Verify JWT token
// @access  Private
router.get("/verify", auth, verifyToken);

module.exports = router;
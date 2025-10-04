// controllers/userController.js
const User = require("../models/User");

// GET /api/users
const getUsers = async (req, res) => {
  try {
    // Lấy tất cả user, sắp xếp mới nhất trước
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({
      error: "Lỗi khi lấy danh sách users",
      detail: err.message,
    });
  }
};

// POST /api/users
const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        error: "Tên và email là bắt buộc",
      });
    }

    // Tạo user mới trong MongoDB
    const newUser = new User({ name, email });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (err) {
    // Xử lý lỗi trùng email
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ error: "Email đã tồn tại trong hệ thống" });
    }
    res.status(500).json({ error: "Lỗi khi tạo user", detail: err.message });
  }
};

// PUT /api/users/:id
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "Không tìm thấy user" });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({
      error: "Lỗi khi cập nhật user",
      detail: err.message,
    });
  }
};

// DELETE /api/users/:id
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "Không tìm thấy user" });
    }

    res.json({ message: "Xóa user thành công" });
  } catch (err) {
    res.status(500).json({
      error: "Lỗi khi xóa user",
      detail: err.message,
    });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};

// controllers/userController.js
const User = require("../models/User");

// GET /api/users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }); // lấy tất cả user, mới nhất trước
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Lỗi khi lấy danh sách user", detail: err.message });
  }
};

// POST /api/users
const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res
        .status(400)
        .json({ error: "Vui lòng nhập đầy đủ name và email" });
    }

    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "Email đã tồn tại" });
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
    res
      .status(500)
      .json({ error: "Lỗi khi cập nhật user", detail: err.message });
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
    res.status(500).json({ error: "Lỗi khi xóa user", detail: err.message });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};

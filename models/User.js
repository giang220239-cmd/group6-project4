const mongoose = require("mongoose");

// Định nghĩa User schema với validation
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tên không được để trống"],
      trim: true,
      minlength: [2, "Tên phải có ít nhất 2 ký tự"],
      maxlength: [100, "Tên không vượt quá 100 ký tự"],
    },
    email: {
      type: String,
      required: [true, "Email không được để trống"],
      trim: true,
      lowercase: true,
      unique: true,
      match: [/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, "Email không hợp lệ"],
    },
  },
  { timestamps: true } // tự động thêm createdAt và updatedAt
);

// Xuất model, tránh lỗi khi server reload nhiều lần
module.exports = mongoose.models.User || mongoose.model("User", userSchema);

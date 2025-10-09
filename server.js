const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const cors = require("cors"); // thêm cors để frontend gọi không bị chặn

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const userRoutes = require("./routes/userRoute"); // chú ý tên file: "user.js" hoặc "userRoute.js"
const authRoutes = require("./routes/auth"); // Thêm route auth.js

// Sử dụng routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes); // Thêm route auth.js

// Đường dẫn gốc
app.get("/", (req, res) => {
  res.send("Server đang hoạt động! Vui lòng truy cập các API hoặc frontend.");
});

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Server chạy cổng 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

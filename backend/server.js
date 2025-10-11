const mongoose = require("mongoose");
require("dotenv").config({ path: './.env' });
const express = require("express");
const cors = require("cors"); // thêm cors để frontend gọi không bị chặn

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const userRoutes = require("./routes/userRoute");
const authRoutes = require("./routes/authRoute");

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Server chạy cổng 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

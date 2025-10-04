const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const cors = require("cors"); // thêm cors để frontend gọi không bị chặn

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import user routes
const userRoutes = require("./routes/userRoute"); // chú ý tên file: "user.js" hoặc "userRoute.js"
app.use("/api/users", userRoutes);

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

const mongoose = require("mongoose");
<<<<<<< HEAD
require("dotenv").config({ path: './.env' });
=======
require("dotenv").config({ path: "./.env" });
>>>>>>> database
const express = require("express");
const cors = require("cors"); // thêm cors để frontend gọi không bị chặn

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
<<<<<<< HEAD
<<<<<<< HEAD:backend/server.js
const userRoutes = require("./routes/userRoute");
const authRoutes = require("./routes/authRoute");
=======
const userRoutes = require("./routes/userRoute");
const authRoutes = require("./routes/authRoute");
const profileRoutes = require("./routes/profileRoute");
const adminRoutes = require("./routes/adminRoute");
const advancedRoutes = require("./routes/advancedRoute");

// Import services để test connection
const emailService = require("./services/emailService");
const CloudinaryService = require("./services/cloudinaryService");
>>>>>>> database

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
<<<<<<< HEAD
=======
const userRoutes = require("./routes/userRoute"); // chú ý tên file: "user.js" hoặc "userRoute.js"
const authRoutes = require("./routes/auth"); // Thêm route auth.js

// Sử dụng routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes); // Thêm route auth.js

// Đường dẫn gốc
app.get("/", (req, res) => {
  res.send("Server đang hoạt động! Vui lòng truy cập các API hoặc frontend.");
});
>>>>>>> 48dd825bfff98048e7767be9821847b60563c5e3:server.js
=======
app.use("/api/profile", profileRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/advanced", advancedRoutes);
>>>>>>> database

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URI)
<<<<<<< HEAD
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Server chạy cổng 3000
const PORT = process.env.PORT || 3000;
=======
  .then(() => {
    console.log("✅ MongoDB connected");

    // Test connections (commented out to prevent crash during testing)
    // emailService.testConnection().catch(err =>
    //   console.log("❌ Email server connection failed:", err.message)
    // );

    // CloudinaryService.testConnection().catch(err =>
    //   console.log("❌ Cloudinary connection failed:", err.message)
    // );
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Server chạy cổng 8080
const PORT = process.env.PORT || 8080;
>>>>>>> database
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

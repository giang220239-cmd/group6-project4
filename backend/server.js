const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });
const express = require("express");
const cors = require("cors"); // thêm cors để frontend gọi không bị chặn

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const userRoutes = require("./routes/userRoute");
const authRoutes = require("./routes/authRoute");
const profileRoutes = require("./routes/profileRoute");
const adminRoutes = require("./routes/adminRoute");
const advancedRoutes = require("./routes/advancedRoute");

// Import services để test connection
const emailService = require("./services/emailService");
const CloudinaryService = require("./services/cloudinaryService");

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/advanced", advancedRoutes);

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URI)
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
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

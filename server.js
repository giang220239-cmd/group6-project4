const express = require("express");
const app = express();

// Middleware parse JSON
app.use(express.json());

// Import user routes
const userRoutes = require("./routes/userRoute");
app.use("/api/users", userRoutes);

// Server chạy cổng 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

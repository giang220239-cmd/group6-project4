const express = require("express");
const app = express();

// Middleware để parse JSON
app.use(express.json());

// Đọc PORT từ biến môi trường hoặc mặc định 3000
const PORT = process.env.PORT || 3000;

// Chạy server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

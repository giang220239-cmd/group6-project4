// Danh sách user mẫu (chưa kết nối DB)
let users = [
  { id: 1, name: "Nguyen Van A", email: "a@example.com" },
  { id: 2, name: "Tran Thi B", email: "b@example.com" },
];

// GET /api/users
const getUsers = (req, res) => {
  res.json(users);
};

// POST /api/users
const createUser = (req, res) => {
  const { name, email } = req.body;

  // Tạo id tự tăng
  const newUser = {
    id: users.length + 1,
    name,
    email,
  };

  users.push(newUser);
  res.status(201).json(newUser);
};

module.exports = {
  getUsers,
  createUser,
};

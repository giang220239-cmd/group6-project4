import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });

  // Lấy danh sách user khi load trang
  useEffect(() => {

    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:8080/api/users");
    setUsers(res.data);
  };

  // Xóa user
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/users/${id}`);
    fetchUsers();
  };

  // Bấm nút sửa -> hiện form
  const handleEdit = (user) => {
    setEditingUser(user._id);
    setFormData({ name: user.name, email: user.email });
  };

  // Submit form cập nhật
  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/api/users/${editingUser}`, formData);
    setEditingUser(null);
    setFormData({ name: "", email: "" });
    fetchUsers();
    axios
      .get("http://localhost:8080/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Lỗi khi lấy users:", err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${id}`);
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Lỗi khi xóa user:", err);
    }
  };

  const handleEdit = async (id) => {
    try {
      const newName = prompt("Nhập tên mới:");
      const newEmail = prompt("Nhập email mới:");
      const res = await axios.put(`http://localhost:8080/api/users/${id}`, {
        name: newName,
        email: newEmail,
      });
      setUsers(users.map((u) => (u._id === id ? res.data : u)));
    } catch (err) {
      console.error("Lỗi khi sửa user:", err);
    }
  };

  return (
    <div>
      <h2>Danh sách User</h2>
      <ul>

        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email}
            <button onClick={() => handleEdit(user)}>Sửa</button>
            <button onClick={() => handleDelete(user._id)}>Xóa</button>

        {users.map((u) => (
          <li key={u._id}>
            {u.name} - {u.email}
            <button onClick={() => handleEdit(u._id)}>Sửa</button>
            <button onClick={() => handleDelete(u._id)}>Xóa</button>
          </li>
        ))}
      </ul>

      {editingUser && (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <button type="submit">Cập nhật</button>
        </form>
      )}
    </div>
  );
};

export default UserList;

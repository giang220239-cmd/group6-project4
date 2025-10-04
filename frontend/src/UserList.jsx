import React, { useEffect, useState } from "react";
import axios from "axios";
import AddUser from "./AddUser";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });

  // Lấy danh sách user khi load trang
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy users:", err);
    }
  };

  // Xóa user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/${id}`);
      setUsers(users.filter((u) => u._id !== id)); // cập nhật state sau khi xóa
    } catch (err) {
      console.error("Lỗi khi xóa user:", err);
    }
  };

  // Bấm nút sửa -> hiện form
  const handleEdit = (user) => {
    setEditingUser(user._id);
    setFormData({ name: user.name, email: user.email });
  };

  // Submit form cập nhật
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/users/${editingUser}`, formData);
      setEditingUser(null);
      setFormData({ name: "", email: "" });
      fetchUsers(); // reload danh sách sau khi update
    } catch (err) {
      console.error("Lỗi khi cập nhật user:", err);
    }
  };

  return (
    <div>
       {/* Form thêm user */}
    <AddUser onUserAdded={fetchUsers} />
      <h2>Danh sách User</h2>
      {/* Danh sách user */}
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email}
            <button onClick={() => handleEdit(user)}>Sửa</button>
            <button onClick={() => handleDelete(user._id)}>Xóa</button>
          </li>
        ))}
      </ul>

      {/* Form sửa user */}
      {editingUser && (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
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

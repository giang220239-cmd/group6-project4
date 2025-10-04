import React, { useState } from "react";
import axios from "axios";

function AddUser({ fetchUsers }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Tên không được để trống");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Email không hợp lệ");
      return;
    }
    try {
      await axios.post("http://localhost:8080/api/users", { name, email }); // ✅ port 8080
      setName("");
      setEmail("");
      if (fetchUsers) fetchUsers(); // gọi lại để refresh danh sách
    } catch (err) {
      console.error("Lỗi khi thêm user:", err);
    }
  };

  return (
    <div>
      <h2>Thêm User mới</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
}

export default AddUser;

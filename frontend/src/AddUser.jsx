import React, { useState } from "react";
import axios from "axios";

function AddUser({ onUserAdded }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/users", { name, email }); // ✅ sửa port 8080
      setName("");
      setEmail("");
      if (onUserAdded) onUserAdded(); // reload danh sách
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

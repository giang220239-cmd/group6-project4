import React, { useEffect, useState } from "react";
import axios from "axios";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users") // ✅ Sửa port 3000 thành 8080
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Lỗi khi lấy users:", err));
  }, []);

  return (
    <div>
      <h2>Danh sách User</h2>
      <ul>
        {users.map((u) => (
          <li key={u._id}>
            {u.name} - {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;

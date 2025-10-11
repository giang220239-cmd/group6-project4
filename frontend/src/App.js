import React, { useState, useEffect } from "react";
import Header from "./Header";
import UserList from "./UserList";
import Statistics from "./Statistics";
import axios from "axios";
import "./UserManagement.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="app-container">
      <Header totalUsers={users.length} />
      
      {loading ? (
        <div className="loading" style={{ padding: '3rem' }}>
          <div className="loading-spinner"></div>
          Đang tải dữ liệu...
        </div>
      ) : (
        <>
          <div className="slide-up">
            <Statistics 
              totalUsers={users.length} 
              recentUsers={users.slice(-5)} // 5 users gần nhất
            />
          </div>
          
          <main className="main-content slide-up">
            <UserList users={users} onUsersChange={setUsers} refreshUsers={fetchUsers} />
          </main>
        </>
      )}
    </div>
  );
}

export default App;

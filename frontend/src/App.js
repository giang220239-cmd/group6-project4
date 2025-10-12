import React, { useState, useEffect } from "react";
import Header from "./Header";
import UserList from "./UserList";
import AddUser from "./AddUser";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import Profile from "./Profile";
import Admin from "./Admin";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import "./UserManagement.css";
import axios from "axios"; // Import axios để sử dụng

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/api/users");
      // API giờ trả về mảng users trực tiếp
      setUsers(res.data || []);
    } catch (err) {
      console.error("Lỗi khi lấy users:", err);
      setUsers([]); // Set empty array nếu có lỗi
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Header totalUsers={users.length} />
        <Routes>
          <Route
            path="/"
            element={
              <UserList
                users={users}
                loading={loading}
                onUsersChange={setUsers}
                refreshUsers={fetchUsers}
              />
            }
          />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

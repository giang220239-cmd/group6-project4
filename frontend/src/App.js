import React, { useState, useEffect } from "react";
import Header from "./Header";
import UserList from "./UserList";
<<<<<<< HEAD
<<<<<<< HEAD
import Statistics from "./Statistics";
import axios from "axios";
import "./UserManagement.css";
=======
=======
>>>>>>> database
import AddUser from "./AddUser";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import Profile from "./Profile";
<<<<<<< HEAD
>>>>>>> 48dd825bfff98048e7767be9821847b60563c5e3
=======
import Admin from "./Admin";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import "./UserManagement.css";
import axios from "axios"; // Import axios để sử dụng
>>>>>>> database

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/api/users");
<<<<<<< HEAD
      setUsers(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy users:", err);
=======
      // API giờ trả về mảng users trực tiếp
      setUsers(res.data || []);
    } catch (err) {
      console.error("Lỗi khi lấy users:", err);
      setUsers([]); // Set empty array nếu có lỗi
>>>>>>> database
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
    <Router>
      <Routes>
        <Route path="/" element={<h1>Welcome to the User Management System</h1>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/users"
          element={
            <div>
              <h1>Quản lý User</h1>
              <AddUser onUserAdded={handleUserAdded} />
              <UserList key={reload} />
            </div>
          }
        />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
>>>>>>> 48dd825bfff98048e7767be9821847b60563c5e3
=======
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
>>>>>>> database
  );
}

export default App;

import React, { useState } from "react";
import UserList from "./UserList";
import AddUser from "./AddUser";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import Profile from "./Profile";

function App() {
  const [reload, setReload] = useState(false);

  const handleUserAdded = () => {
    setReload(!reload); // đổi state để reload UserList
  };

  return (
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
  );
}
export default App;

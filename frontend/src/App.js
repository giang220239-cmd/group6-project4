import React from "react";
import UserList from "./UserList";

function App() {
  return (
    <div className="App">
      <h1>Quản lý User</h1>
      <UserList /> {/* ✅ UserList bao gồm có AddUser */}
    </div>
  );
}

export default App;

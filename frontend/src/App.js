import React, { useState } from "react";
import UserList from "./UserList";
import AddUser from "./AddUser";

function App() {
  const [reload, setReload] = useState(false);

  const handleUserAdded = () => {
    setReload(!reload); // đổi state để reload UserList
  };

  return (
    <div>
      <h1>Quản lý User</h1>
      <AddUser onUserAdded={handleUserAdded} />
      <UserList key={reload} />
    </div>
  );
}

export default App;

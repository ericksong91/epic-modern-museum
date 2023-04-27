// import '../../css/App.css';
// import {
//   Routes,
//   Route,
// } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "../context/user";
import { Button } from "@mui/material";

function Navbar() {
  const { user, logout } = useContext(UserContext);

  return (
    <div className="Navbar">
      {!user ? <h1>Navbar</h1> : <h1>{user.username}'s Navbar</h1>}
      {!user ? null : <Button variant="contained" onClick={logout}>Logout</Button>}
    </div>
  );
}

export default Navbar;

// import '../../css/App.css';
// import {
//   Routes,
//   Route,
// } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "../context/user";

function Navbar() {
  const { user } = useContext(UserContext);

  return (
    <div className="Navbar">
        <h1>{user ? user.username : null}'s Navbar</h1>
    </div>
  );
}

export default Navbar;

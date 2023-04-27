import { useContext } from "react";
import { UserContext } from "../context/user";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
  const { user, logout } = useContext(UserContext);

  return (
    <div className="Navbar">
      {!user ? <h1>Navbar</h1> : <h1>{user.username}'s Navbar</h1>}
      {!user ? null : <Link to="/"><Button variant="contained" onClick={logout}>Logout</Button></Link>}
    </div>
  );
}

export default Navbar;

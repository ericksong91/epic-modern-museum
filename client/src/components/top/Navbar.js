import { useContext } from "react";
import { UserContext } from "../context/user";
import { Button, Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
  const { user, logout } = useContext(UserContext);

  return (
    <div className="Navbar">
      <Container maxWidth="lg">
        {!user ? <h2>Welcome, Guest!</h2> : <h2>Welcome, {user.username}!</h2>}
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            {<Link to="/"><Button variant="contained">Return Home</Button></Link>}
          </Grid>
          <Grid item>
            {!user ? <Link to="/locations"><Button variant="contained">View Museums</Button></Link>
              :
              <Link to="/profile"><Button variant="contained">My Profile</Button></Link>}
          </Grid>
          <Grid item>
            {!user ? <Link to="/login"><Button variant="contained">Login</Button></Link>
              :
              <Link to="/locations"><Button variant="contained">View Museums</Button></Link>}
          </Grid>
          <Grid item>
            {!user ? <Link to="/signup"><Button variant="contained">Signup</Button></Link>
              :
              <Link to="/"><Button variant="contained" onClick={logout}>Logout</Button></Link>}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Navbar;

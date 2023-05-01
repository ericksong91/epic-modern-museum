import { useContext } from "react";
import { UserContext } from "../context/user";
import { Button, Container, Card, Grid } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
  const { user, logout } = useContext(UserContext);

  return (
    <div className="Navbar">
      <Container maxWidth="lg">
        {!user ? <h1>Navbar</h1> : <h1>{user.username}'s Navbar</h1>}
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            {<Link to="/"><Button variant="contained">Return Home</Button></Link>}
          </Grid>
          <Grid item>
            {<Link to="/museums"><Button variant="contained">View Museums</Button></Link>}
          </Grid>
          <Grid item>
            {!user ? <Link to="/login"><Button variant="contained">Login</Button></Link>
              :
              <Link to="/"><Button variant="contained" onClick={logout}>Logout</Button></Link>}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Navbar;

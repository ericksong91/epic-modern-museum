import { useState, useContext } from 'react';
import { Button, Container, Box, TextField } from '@mui/material';
import { UserContext } from '../context/user';
import { Navigate, Link } from 'react-router-dom';

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const { user, login } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    login(username, password, setIsLoading, setErrors);
  }

  if (user) {
    return <Navigate replace to="/profile" />;
  }

  return (
    <Container className='LoginPage' component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Log In</h1>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="user"
            label="Username"
            name="user"
            autoComplete="user"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? "Loading..." : "Login"}
          </Button>
          {errors}
        </Box>
      </Box>
      <Link to="/signup">
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Don't have an account? Signup!
        </Button>
      </Link>
    </Container>
  );
}

export default LoginForm;

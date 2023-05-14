import { useState, useContext } from "react";
import { UserContext } from "../context/user";
import { Navigate, Link } from "react-router-dom";
import { Button, Container, Box, TextField } from '@mui/material';

function SignupForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [errors, setErrors] = useState([]);
    const [bio, setBio] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { user, signup } = useContext(UserContext);

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        signup(username, password, passwordConfirmation, bio, setIsLoading, setErrors);
    };

    if (user) {
        return <Navigate replace to="/profile" />;
    };

    return (
        <Container className='SignupPage' component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <h1>Sign Up</h1>
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
                        label="Password (9 - 17 characters)"
                        inputProps={{ maxLength: 17, minLength: 9 }}
                        type="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password_confirmation"
                        name="password_confirmation"
                        label="Password Confirmation"
                        inputProps={{ maxLength: 17, minLength: 9 }}
                        type="password"
                        value={passwordConfirmation}
                        onChange={(e) => { setPasswordConfirmation(e.target.value) }}
                    />
                    <TextField
                        margin="normal"
                        required
                        multiline
                        fullWidth
                        id="biography"
                        name="biography"
                        label={`Biography (${300 - bio.length} chars left)`}
                        inputProps={{ maxLength: 300 }}
                        value={bio}
                        onChange={(e) => { setBio(e.target.value) }}
                    />
                    {isLoading ?
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >Loading...</Button>
                        :
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >Signup</Button>}
                    {errors}
                </Box>
            </Box>
            <Link to="/login">
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Already have an account? Login!
                </Button>
            </Link>
        </Container>
    )

}

export default SignupForm;
import { useState, useContext } from "react";
import { UserContext } from "../context/user";
import { Button, Container, Box, TextField } from '@mui/material';

function SignupForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { user, login, errors } = useContext(UserContext);

    function handleSubmit(e) {
        e.preventDefault();
        console.log(e)
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
                        label="Password"
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
                        type="password"
                        value={passwordConfirmation}
                        onChange={(e) => { setPasswordConfirmation(e.target.value) }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {isLoading ? "Loading..." : "Sign Up"}
                    </Button>
                    {errors}
                </Box>
            </Box>
        </Container>
    )

}

export default SignupForm;
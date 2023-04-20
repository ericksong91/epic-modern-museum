import { useState } from 'react';
import { Box, TextField } from '@mui/material';


function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="LoginForm">
      <h1>Hello</h1>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Login" variant="outlined" />
        <TextField id="outlined-basic" label="Password" variant="outlined" />
      </Box>


    </div>
  );
}

export default LoginForm;

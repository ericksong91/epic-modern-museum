import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Box, TextField, Card, Grid } from '@mui/material';

function NewPaintingForm({ }) {
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [image, setImage] = useState("");
    const [year, setYear] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();

    }

    return (
        <div className="NewPaintingForm">
            <Container className='NewPaintingForm' component="main" maxWidth="xs">
                <Grid container>
                    <Grid item>
                        <Box
                            sx={{
                                marginTop: 8,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <h1>Submit New Painting</h1>
                            <Box component="form" onSubmit={handleSubmit}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Painting Name"
                                    name="name"
                                    autoFocus
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="bio"
                                    name="bio"
                                    label={`Description (${300 - bio.length} char left)`}
                                    value={bio}
                                    onChange={(e) => { setBio(e.target.value) }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="painting"
                                    name="painting"
                                    label="Painting URL (must be valid image type)"
                                    type="url"
                                    value={image}
                                    onChange={(e) => { setImage(e.target.value) }}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="year"
                                    name="year"
                                    label="Year Created"
                                    type="number"
                                    value={year}
                                    onChange={(e) => { setYear(e.target.value) }}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    {isLoading ? "Loading..." : "Submit"}
                                </Button>
                                {errors}
                            </Box>
                        </Box>
                        <Grid item>
                            Test
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default NewPaintingForm;

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Container, Box, TextField, Card, CardMedia, CardHeader, CardContent } from '@mui/material';

function NewPaintingForm({ }) {
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [image, setImage] = useState("");
    const [year, setYear] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
    }

    return (
        <div className="NewPaintingForm">
            <Container className='NewPaintingForm' component="main" maxWidth="xs">
                <Grid container justifyContent={"center"}>
                    <Grid item xs={10}>
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
                                label={`Description (${300 - bio.length} chars left)`}
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
                                label="Year Created (min: 1900)"
                                type="number"
                                inputProps={{ min: 1900, max: 2023 }}
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
                        <Grid item >
                            <Card sx={{ maxWidth: 345 }}>
                                <CardHeader
                                    title={"Preview"}
                                />
                                <CardMedia
                                    component="img"
                                    height="400"
                                    image={image}
                                    alt={name}
                                />
                                <CardContent>
                                    {bio}
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default NewPaintingForm;

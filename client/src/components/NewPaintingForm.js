import { useState } from 'react';
import {
    Button, Grid, Container, Box, TextField, Card, CardMedia, CardHeader, CardContent,
    FormControl, InputLabel, Select, MenuItem
} from '@mui/material';

function NewPaintingForm({ museums }) {
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [image, setImage] = useState("");
    const [year, setYear] = useState("");
    const [selectMuseum, setSelectMuseum] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const museumList = museums.map((muse) => <MenuItem key={muse.id} value={muse.name}>{muse.name}</MenuItem>);

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        const paintObj = {
            name,
            bio,
            img_url: image,
            year,
        }

        console.log(paintObj)
    }

    return (
        <div className="NewPaintingForm">
            <Container className='NewPaintingForm' component="main" maxWidth="xs">
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
                        <FormControl fullWidth required margin="normal">
                            <InputLabel>Museum</InputLabel>
                            <Select
                                label="Museums"
                                value={selectMuseum}
                                id="Museums"
                                onChange={(e) => { setSelectMuseum(e.target.value) }}
                            >
                                {museumList}
                            </Select>
                        </FormControl>
                        <Card fullWidth>
                            <CardHeader
                                title={"Preview"}
                                subheader={name}
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
            </Container>
        </div>
    );
}

export default NewPaintingForm;

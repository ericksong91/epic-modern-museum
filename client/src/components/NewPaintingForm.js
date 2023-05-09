import { useState } from 'react';
import {
    Button, Container, Box, TextField, Card, CardMedia, CardHeader, CardContent,
    FormControl, InputLabel, Select, MenuItem, Grid
} from '@mui/material';

function NewPaintingForm({ museums, onShow, onNewPainting }) {
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [image, setImage] = useState("");
    const [year, setYear] = useState("");
    const [selectMuseum, setSelectMuseum] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const museumList = museums.map((muse) => <MenuItem key={muse.id} value={muse.name}>{muse.name}</MenuItem>);
    const limitNum = 4;

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        const museumObj = museums.filter((muse) => muse.name === selectMuseum)

        const paintObj = {
            name,
            bio,
            img_url: image,
            year,
            museum_id: museumObj[0].id
        }

        onNewPainting(paintObj, setIsLoading, setErrors, cleanUp);

        function cleanUp() {
            setName("");
            setBio("");
            setImage("");
            setYear("");
            setSelectMuseum("");
            setErrors([]);
            onShow(false);
        };
    }

    return (
        <div className="NewPaintingForm">
            <Container className='NewPaintingForm' component="main">
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    <h1>Submit New Painting</h1>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={2} justifyContent={"center"}>
                            <Grid item xs={12} sm={6} md={4}>
                                <Card sx={{ maxWidth: 300, maxheight: 800 }} >
                                    <CardHeader 
                                    title={"Details"}
                                    subheader={name}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Painting Name"
                                        name="name"
                                        type="text"
                                        inputProps={{ maxLength: 30 }}
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
                                        type="text"
                                        inputProps={{ maxLength: 150 }}
                                        label={`Description (${150 - bio.length} chars left)`}
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
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
                                        onChange={(e) => setImage(e.target.value)}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="year"
                                        name="year"
                                        label="Year Created (min: 1900)"
                                        type="number"
                                        inputProps={{ min: 1900, max: 2023, maxLength: 4 }}
                                        value={year}
                                        onChange={(e) => {
                                            if (e.target.value.toString().length <= limitNum) {
                                                setYear(e.target.value)
                                            }
                                        }}
                                    />
                                    <FormControl fullWidth required margin="normal">
                                        <InputLabel>Museum</InputLabel>
                                        <Select
                                            label="Museums"
                                            value={selectMuseum}
                                            id="Museums"
                                            onChange={(e) => setSelectMuseum(e.target.value)}
                                        >
                                            {museumList}
                                        </Select>
                                    </FormControl>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Card sx={{ maxWidth: 345, maxheight: 600 }} >
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
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
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

import { useState } from 'react';
import {
    Button, Container, Box, TextField, Card, CardMedia, CardHeader, CardContent,
    FormControl, InputLabel, Select, MenuItem, Grid
} from '@mui/material';

function EditPaintingForm({ painting, museums, museum, onReveal, onEditPainting, onDeletePainting }) {
    const [name, setName] = useState(painting.name);
    const [bio, setBio] = useState(painting.bio);
    const [image, setImage] = useState(painting.img_url);
    const [year, setYear] = useState(painting.year);
    const [isLoading, setIsLoading] = useState(false);
    const [selectMuseum, setSelectMuseum] = useState(museum.name);
    const [errors, setErrors] = useState([]);
    const museumList = museums.map((muse) => <MenuItem key={muse.id} value={muse.name}>{muse.name}</MenuItem>);
    const limitNum = 4;


    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        const museumObj = museums.filter((muse) => muse.name === selectMuseum);

        const paintObj = {
            id: painting.id,
            name,
            bio,
            img_url: image,
            year,
            museum_id: museumObj[0].id
        };

        onEditPainting(paintObj, setIsLoading, setErrors, onReveal);
    }

    return (
        <div className="EditPaintingForm">
            <h1>Editing</h1>
            <Container>
                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container justifyContent={"center"}>
                        <Card sx={{ width: 800 }}>
                            <CardHeader
                                title={
                                    <TextField
                                        margin="normal"
                                        required
                                        id="name"
                                        label="Painting Name"
                                        name="name"
                                        type="text"
                                        inputProps={{ maxLength: 30 }}
                                        autoFocus
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                }
                                subheader={<TextField
                                    margin="normal"
                                    required
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
                                }
                            />
                            <TextField
                                margin="normal"
                                required
                                id="painting"
                                name="painting"
                                label="Painting URL (must be valid image type)"
                                type="url"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                            <CardMedia
                                component="img"
                                height={700}
                                image={image}
                                alt={name}
                            />
                            <CardContent>
                                Currently housed at {museum.name} {
                                    <FormControl fullWidth required margin="normal">
                                        <InputLabel>Change Museum</InputLabel>
                                        <Select
                                            label="Museums"
                                            value={selectMuseum}
                                            id="Museums"
                                            onChange={(e) => setSelectMuseum(e.target.value)}
                                        >
                                            {museumList}
                                        </Select>
                                    </FormControl>
                                }
                            </CardContent>
                            <CardContent>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    multiline={true}
                                    minRows={4}
                                    id="bio"
                                    name="bio"
                                    type="text"
                                    inputProps={{ maxLength: 150 }}
                                    label={`Description (${150 - bio.length} chars left)`}
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                />
                            </CardContent>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ m: 1 }}
                            >
                                {isLoading ? "Loading..." : "Save Changes"}
                            </Button>
                            <Button variant="contained" sx={{ m: 1 }} onClick={() => onReveal(false)}>Cancel</Button>
                            <Button variant="contained" sx={{ m: 1 }} onClick={() => onDeletePainting(painting.id)}>Delete Painting</Button>
                        </Card>
                        {errors}
                    </Grid>
                </Box>
            </Container>
        </div>
    );
}

export default EditPaintingForm;

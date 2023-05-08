import { useState } from 'react';
import {
    Button, Container, Box, TextField, Card, CardMedia, CardHeader, CardContent,
    FormControl, InputLabel, Select, MenuItem, Grid
} from '@mui/material';

function EditPaintingForm({ museums, onShow, onNewPainting }) {
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
        const museumObj = museums.filter((muse) => muse.name === selectMuseum)

        const paintObj = {
            name,
            bio,
            img_url: image,
            year,
            museum_id: museumObj[0].id
        }

        setName("");
        setBio("");
        setImage("");
        setYear("");
        setSelectMuseum("");
        setErrors([]);
        onShow(false);
    }

    return (
        <div className="EditPaintingForm"></div>
    );
}

export default EditPaintingForm;

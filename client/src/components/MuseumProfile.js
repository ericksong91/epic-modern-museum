import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PaintingCard from "./cards/PaintingCard";
import { Button, Grid, Container } from '@mui/material';

function MuseumProfile({ museums }) {
    const index = parseInt(useParams().id);
    const museumObj = museums.find((museum) => museum.id === index) === undefined ?
        []
        :
        museums.find((museum) => museum.id === index)
    const [paintings, setPaintings] = useState([]);

    useEffect(() => {
        museums.length === 0 ? setPaintings([]) : setPaintings(museumObj.paintings)
    }, [index, museums, museumObj.paintings])

    //Filter paintings from Museum
    const paintingsFilter = paintings.map((paint) => {
        return <Grid item xs={12} sm={6} md={4}><PaintingCard key={paint.id} paint={paint} /></Grid>
    })

    return (
        <div className="MuseumProfile">
            <Container maxWidth="lg">
                <h1>You have arrived at the {museumObj.name}!</h1>
                <h3>{museumObj.bio}</h3>
                <h3>Located at {museumObj.location}</h3>

                <h2>Gallery</h2>
                <Grid container spacing={4}>
                    {paintingsFilter}
                </Grid>
            </Container>
        </div>
    );
}

export default MuseumProfile;

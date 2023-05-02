import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PaintingCard from "./cards/PaintingCard";
import { Grid, Container } from '@mui/material';

function MuseumProfile({ museums }) {
    const index = parseInt(useParams().id);
    const museumObj = museums.find((museum) => museum.id === index) === undefined ?
        []
        :
        museums.find((museum) => museum.id === index)
    const [paintings, setPaintings] = useState([]);

    useEffect(() => {
        museums.length === 0 ? setPaintings([]) : setPaintings(museumObj.paintings)
    }, [museums]);

    const paintingsList = paintings.map((paint) => {
        return <Grid item xs={12} sm={6} md={4} key={paint.id}><PaintingCard paint={paint} /></Grid>
    })

    return (
        <div className="MuseumProfile">
            <Container maxWidth="lg">
                <h1>You have arrived at the {museumObj.name}!</h1>
                <h3>{museumObj.bio}</h3>
                <h3>Located at {museumObj.location}</h3>

                <h2>Gallery</h2>
                <Grid container spacing={4}>
                    {paintingsList}
                </Grid>
            </Container>
        </div>
    );
}

export default MuseumProfile;

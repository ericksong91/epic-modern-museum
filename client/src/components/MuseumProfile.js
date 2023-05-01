import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MuseumCard from "./MuseumCard";
import Button from '@mui/material/Button';
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
    }, [index, museums, museumObj.paintings])

    //Filter paintings from Museum
    const paintingsFilter = paintings.map((paint) => {
        return <Grid item xs={12} sm={6} md={4}><MuseumCard key={paint.id} paint={paint} /></Grid>
    })

    return (
        <div className="MuseumProfile">
            <Container maxWidth="lg">
                <h1>You have arrived!</h1>

                <h2>{museumObj.location}</h2>
                <h2>{museumObj.name}</h2>
                <h3>{museumObj.bio}</h3>

                <h2>List of Paintings:</h2>
                <Grid container spacing={4}>
                    {paintingsFilter}
                </Grid>
            </Container>
        </div>
    );
}

export default MuseumProfile;

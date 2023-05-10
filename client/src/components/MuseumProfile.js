import { useParams } from "react-router-dom";
import PaintingCard from "./cards/PaintingCard";
import { Grid, Container } from '@mui/material';

function MuseumProfile({ museums, paintings, artists }) {
    const index = parseInt(useParams().id);
    const museum = museums.find((museum) => museum.id === index) === undefined ?
        {}
        :
        museums.find((museum) => museum.id === index)

    const paintingsList = paintings.filter((paint) => paint.museum_id === index)

    const paintingCards = paintingsList.map((paint) => {
        return <Grid item xs={12} sm={6} md={4} key={paint.id}><PaintingCard paint={paint} museum={museum} artists={artists} /></Grid>
    })

    return (
        <div className="MuseumProfile">
            <Container maxWidth="lg">
                <h1>You have arrived at the {museum.name}!</h1>
                <h3>{museum.bio}</h3>
                <h3>Located at {museum.location}</h3>

                <h2>Gallery</h2>
                <Grid container spacing={4}>
                    {paintingCards}
                </Grid>
            </Container>
        </div>
    );
}

export default MuseumProfile;

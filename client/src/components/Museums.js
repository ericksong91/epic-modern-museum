import { Link } from "react-router-dom";
import MuseumCard from "./cards/MuseumCard";
import { Button, Grid } from '@mui/material';


function Museums({ museums }) {
    const museumList = museums.map((museum) => {
        return (
            <Grid item xs={12} sm={6} md={4}><MuseumCard key={museum.id} museum={museum} /></Grid>
        )
    })

    return (
        <div className="Museums">
            <h1>List of All Epic Museums!</h1>
            <Grid container spacing={2} justifyContent={"center"}>
                {museumList}
            </Grid>
        </div>
    );
}

export default Museums;

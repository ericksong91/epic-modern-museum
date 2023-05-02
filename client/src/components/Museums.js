import MuseumCard from "./cards/MuseumCard";
import { Grid } from '@mui/material';


function Museums({ museums }) {
    const museumList = museums.map((museum) => {
        return (
            <Grid item xs={12} sm={6} md={4} key={museum.id}><MuseumCard museum={museum} /></Grid>
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

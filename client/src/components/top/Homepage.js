import { useContext } from 'react';
import { UserContext } from '../context/user';
import { Link } from "react-router-dom"
import {
    Button, Grid, Container, Card, CardContent, CardHeader, CardMedia
} from '@mui/material';
import '../../css/App.css';


function Homepage() {
    const { user } = useContext(UserContext);
    const museumURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/National_Museum_of_African_American_History_and_Culture_in_February_2020.jpg/1280px-National_Museum_of_African_American_History_and_Culture_in_February_2020.jpg";
    const artistURL = "https://upload.wikimedia.org/wikipedia/en/7/70/Bob_at_Easel.jpg"

    return (
        <div className="Homepage">
            <h1>Welcome to Epic Modern Museum!</h1>
            <h2>You are welcome to explore all the paintings we have to offer as a guest or curator!</h2>
            <Grid container spacing={2} justifyContent={'center'}>
                <Grid item>
                    <Card>
                        <CardMedia
                            component="img"
                            width="300"
                            height="300"
                            image={museumURL}
                            alt={"Explore Museums"}
                        />
                        {!user ? <Link to={'/museums'}><Button variant="contained">Explore Museums as a Guest</Button></Link> :
                            <Link to={'/museums'}><Button variant="contained">Explore Museums</Button></Link>}
                    </Card>

                </Grid>
                <Grid item>
                    <Card>
                    <CardMedia
                            component="img"
                            width="300"
                            height="300"
                            image={artistURL}
                            alt={"Your Profile"}
                        />
                        {!user ? <Link to={'/login'}><Button variant="contained">Artist Login</Button></Link> :
                            <Link to={'/profile'}><Button variant="contained">Artist Profile</Button></Link>}
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}

export default Homepage;

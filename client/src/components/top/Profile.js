import { useContext } from 'react';
import { UserContext } from '../context/user'
import PaintingCard from '../cards/PaintingCard';
import MuseumCard from '../cards/MuseumCard';
import { Grid, Container } from '@mui/material';

function Profile() {
    const { user } = useContext(UserContext);

    if (user == null) {
        return <div></div>
    }

    const userPaintings = user.paintings.map((paint) => {
        return <Grid item xs={12} sm={6} md={4} key={paint.id}><PaintingCard paint={paint} /></Grid>
    })
    const userMuseums = user.museums.map((muse) => {
        return <Grid item xs={12} sm={6} md={4} key={muse.id}><MuseumCard museum={muse} /></Grid>
    })

    console.log(user.paintings)

    return (
        <div className="Profile">
            <Container maxWidth="lg">
                <h1>Paintings</h1>
                <Grid container spacing={4} justifyContent={"center"}>
                    {userPaintings}
                </Grid>
                <h1>Hosted at these Museums</h1>
                <Grid container spacing={4} justifyContent={"center"}>
                    {userMuseums}
                </Grid>
            </Container>
        </div>
    );
}

export default Profile;

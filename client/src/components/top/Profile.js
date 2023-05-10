import { useState, useContext } from 'react';
import { UserContext } from '../context/user'
import PaintingCard from '../cards/PaintingCard';
import MuseumCard from '../cards/MuseumCard';
import NewPaintingForm from '../NewPaintingForm';
import { Grid, Container, Button } from '@mui/material';

function Profile({ museums, paintings, artists, onNewPainting }) {
    const [show, setShow] = useState(false);
    const { user } = useContext(UserContext);

    if (!user) {
        return <div></div>
    } //Change this to a Navigate later

    const userPaintings = paintings.filter((paint) => paint.user_id === user.id).map((paint) => {
        return <Grid item xs={12} sm={6} md={4} key={paint.id}><PaintingCard paint={paint} artists={artists} /></Grid>
    });

    const userMuseums = user.museums.map((muse) => {
        return <Grid item xs={12} sm={6} md={4} key={muse.id}><MuseumCard museum={muse} /></Grid>
    });

    return (
        <div className="Profile">
            <Container maxWidth="lg">
                {show ? <NewPaintingForm museums={museums} onShow={setShow} onNewPainting={onNewPainting} /> : null}
                {show ?
                    <Button variant="contained" onClick={() => setShow(false)}>Hide</Button>
                    :
                    <Button variant="contained" onClick={() => setShow(true)}>Submit New Painting!</Button>}
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

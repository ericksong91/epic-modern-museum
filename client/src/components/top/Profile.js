import { useState, useContext } from 'react';
import { UserContext } from '../context/user'
import PaintingCard from '../cards/PaintingCard';
import MuseumCard from '../cards/MuseumCard';
import NewPaintingForm from '../NewPaintingForm';
import { Navigate } from 'react-router-dom';
import { Grid, Container, Button } from '@mui/material';
import { Card, CardContent } from '@mui/material';

function Profile({ museums, paintings, artists, onNewPainting, setPaintings }) {
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const { user, onDelete } = useContext(UserContext);

    if (!user) {
        return <div></div>;
    }

    const userPaintings = paintings.filter((paint) => paint.user_id === user.id).map((paint) => {
        return <Grid item xs={12} sm={6} md={4} key={paint.id}><PaintingCard paint={paint} artists={artists} /></Grid>
    });

    const userMuseums = user.museums.map((muse) => {
        return <Grid item xs={12} sm={6} md={4} key={muse.id}><MuseumCard museum={muse} /></Grid>
    });

    function handleDelete() {
        setIsLoading(true);
        if (window.confirm("Are you sure you want to delete your account?")) {
            console.log("Deleted");
            onDelete(user.id, paintings, setErrors, setIsLoading, setPaintings);
            <Navigate replace to="/" />;
        } else {
            console.log("Your account is safe....for now! :)");
            setIsLoading(false);
        }
    };

    return (
        <div className="Profile">
            <Container maxWidth="lg">
                {show ? <NewPaintingForm museums={museums} onShow={setShow} onNewPainting={onNewPainting} /> : null}
                {show ?
                    <Button variant="contained" onClick={() => setShow(false)}>Hide</Button>
                    :
                    <Button variant="contained" onClick={() => setShow(true)}>Submit New Painting!</Button>}
                <h1>Biography</h1>
                <h2>{user.bio}</h2>
                <h1>Paintings</h1>
                <Grid container spacing={4} justifyContent={"center"}>
                    {userPaintings}
                </Grid>
                <h1>Hosted at these Museums</h1>
                <Grid container spacing={4} justifyContent={"center"}>
                    {userMuseums}
                </Grid>
            </Container>
            <Card sx={{ m: 3 }}>
                {isLoading ?
                    <Button
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >Loading...</Button>
                    :
                    <Button
                        variant="contained"
                        color="error"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleDelete}
                    >Delete Account</Button>}
                <CardContent>
                    {errors}
                </CardContent>
            </Card>
        </div>
    );
}

export default Profile;

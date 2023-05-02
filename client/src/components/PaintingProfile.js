import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, Container, Button, Card, CardContent, CardHeader, CardMedia } from '@mui/material';

function PaintingProfile({ museums }) {
    const index = parseInt(useParams().id);
    const museumObj = museums.find((muse) => muse.paintings.find((paint) => parseInt(paint.id) === index)) === undefined ?
        []
        :
        museums.find((muse) => muse.paintings.find((paint) => parseInt(paint.id) === index));
    const [painting, setPainting] = useState({});
    const [artist, setArtist] = useState({});

    useEffect(() => {
        museums.length === 0 ?
            setPainting({})
            :
            setPainting(museumObj.paintings.find((paint) => parseInt(paint.id) === index));

        museums.length === 0 ?
            setArtist({})
            :
            setArtist(museumObj.users.find((user) => (museumObj.paintings.find((paint) => parseInt(paint.id) === index)).user_id === user.id));
    }, [museums]);

    return (
        <div className="PaintingProfile">
            <Container>
                <Grid container justifyContent={"center"}>
                    <Card sx={{ minWidth: 600 }}>
                        <CardHeader
                            title={painting.name}
                            subheader={`Painter: ${artist.username}`}
                        />
                        <CardMedia
                            component="img"
                            image={painting.img_url}
                            alt={painting.name}
                        />
                        <CardContent>
                            {painting.bio}
                        </CardContent>
                    </Card>
                </Grid>
            </Container>

        </div>
    );
}

export default PaintingProfile;

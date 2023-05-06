import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, Container, Card, CardContent, CardHeader, CardMedia } from '@mui/material';

function PaintingProfile({ paintings, users }) {
    const index = parseInt(useParams().id);
    const [painting, setPainting] = useState({});
    const [artist, setArtist] = useState({});

    useEffect(() => {
        setPainting(paintings.filter((paint) => paint.id === index))
        setArtist(users.filter((user) => user.id === painting[0].user_id))

    }, [paintings, users])


    console.log(painting, artist)
    console.log(users)

    return (
        <div className="PaintingProfile">
            <Container>
                <Grid container justifyContent={"center"}>
                    <Card sx={{ minWidth: 600 }}>
                        <CardHeader
                            title={painting.name}
                            subheader={`Painter: ${artist.username}, ${painting.year}`}
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

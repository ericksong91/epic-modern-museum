import { useParams, useNavigate } from "react-router-dom";
import { Grid, Container, Button, Card, CardContent, CardHeader, CardMedia } from '@mui/material';

function PaintingProfile({ museums, paintings }) {
    const index = parseInt(useParams().id);
    const navigate = useNavigate();
    const painting = paintings.find((paint) => paint.id === index) === undefined ?
        {}
        :
        paintings.find((paint) => paint.id === index);
    const museum = museums.find((muse) => muse.id === painting.museum_id) === undefined ?
        {}
        :
        museums.find((muse) => muse.id === painting.museum_id);
    const artist = Object.keys(museum).length === 0 ?
        {}
        :
        museum.users.find((user) => user.id === painting.user_id);

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
                        Currently housed at {museum.name}
                        </CardContent>
                        <CardContent>
                            {painting.bio}
                        </CardContent>
                        <Button variant="contained" onClick={()=>navigate(-1)}>Return to Previous Page</Button>
                    </Card>
                </Grid>
            </Container>

        </div>
    );
}

export default PaintingProfile;

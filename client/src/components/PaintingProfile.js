import { useContext, useState, useEffect } from "react";
import EditPaintingForm from "./EditPaintingForm";
import { UserContext } from "./context/user";
import { useParams, useNavigate } from "react-router-dom";
import {
    Grid, Container, Button, Card, CardContent, CardHeader, CardMedia
} from '@mui/material';

function PaintingProfile({ museums, paintings, artists, onEditPainting, onDeletePainting }) {
    const index = parseInt(useParams().id);
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [showEdit, setShowEdit] = useState(false);
    const [revealPageEdit, setRevealPageEdit] = useState(false);
    const painting = paintings.find((paint) => paint.id === index) === undefined ?
        {}
        :
        paintings.find((paint) => paint.id === index);
    const museum = museums.find((muse) => muse.id === painting.museum_id) === undefined || paintings.length === 0 ?
        {}
        :
        museums.find((muse) => muse.id === painting.museum_id);
    const artist = (paintings.length === 0 || artists.length === 0) ?
        {}
        :
        artists.find((artist) => artist.id === painting.user_id) 

    useEffect(() => {
        if (user) {
            if (user.id === painting.user_id) {
                setShowEdit(true);
            }
        }
    }, [user, painting.user_id]);

    if(painting === undefined) {
        return <div></div>
    }

    if (paintings.length === 0 || artists.length === 0 || museums.length === 0) {
        return <div>Loading...</div>
    }

    return (
        <div className="PaintingProfile">
            {revealPageEdit ? (
                <EditPaintingForm
                    painting={painting}
                    museums={museums}
                    museum={museum}
                    onReveal={setRevealPageEdit}
                    onEditPainting={onEditPainting}
                    onDeletePainting={onDeletePainting}
                />
            ) : (
                <Container>
                    <Grid container justifyContent={"center"}>
                        <Card sx={{ width: 800 }}>
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
                            {showEdit ?
                                <Button variant="contained" sx={{ m: 1 }} onClick={() => setRevealPageEdit(true)}>Edit</Button>
                                :
                                null}
                            <Button variant="contained" onClick={() => navigate(-1)} sx={{ m: 1 }}>Return to Previous Page</Button>
                        </Card>
                    </Grid>
                </Container>
            )
            }
        </div>
    );
}

export default PaintingProfile;

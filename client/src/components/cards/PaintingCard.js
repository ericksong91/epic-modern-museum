import { Link } from 'react-router-dom';
import { Button, Card, CardContent, CardHeader, CardMedia } from '@mui/material';


function PaintingCard({ paint, artists }) {
    const { bio, id, img_url, user_id, name, year } = paint;
    const artist = artists.length === 0 ?
        null
        :
        artists.find((artist) => artist.id === user_id);

    if (artist === null) {
        return <div>Loading...</div>
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                title={name}
                subheader={`By ${artist.username}, ${year}`}
            />
            <CardMedia
                component="img"
                height="300"
                image={img_url}
                alt={name}
            />
            <CardContent>
                {bio}
            </CardContent>
            <CardContent>
                <Link to={`/paintings/${id}`}><Button variant="contained">More</Button></Link>
            </CardContent>
        </Card>
    );
}

export default PaintingCard;

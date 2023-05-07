import { Link } from 'react-router-dom';
import { Button, Card, CardContent, CardHeader, CardMedia } from '@mui/material';


function PaintingCard({ paint, museum }) {
    const { bio, id, img_url, user_id, name, year } = paint;
    const artist = museum === undefined ?
        null
        :
        museum.users.find((user) => user.id === user_id);

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                title={name}
                subheader={artist === null ? `Created: ${year}` : `By ${artist.username}, ${year}`}
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

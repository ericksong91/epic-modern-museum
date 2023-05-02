import { Link } from 'react-router-dom';
import { Button, Card, CardContent, CardHeader, CardMedia } from '@mui/material';


function PaintingCard({ paint, museum }) {
    const { bio, id, img_url, user_id, name, created_at } = paint;
    const artist = museum === undefined ?
        null
        :
        museum.users.find((user) => user.id === user_id);
    const year = created_at.split(/[-]/);

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                title={name}
                subheader={artist === null ? `Uploaded: ${year[0]}` : `Painted by ${artist.username}`}
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
            <Link to={`/paintings/${id}`}><Button variant="contained">Learn more</Button></Link>
        </Card>
    );
}

export default PaintingCard;

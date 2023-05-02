import { Link } from 'react-router-dom';
import { Button, Card, CardContent, CardHeader, CardMedia } from '@mui/material';


function PaintingCard({ paint }) {
    const { bio, id, img_url, museum_id, user_id, name } = paint;

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                title={name}
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

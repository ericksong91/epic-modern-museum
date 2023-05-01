import Button from '@mui/material/Button';
import { Card, CardContent, CardHeader, CardMedia } from '@mui/material';


function MuseumCard({ paint }) {
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
                <Button variant="contained">Learn more</Button>
            </CardContent>
        </Card>
    );
}

export default MuseumCard;

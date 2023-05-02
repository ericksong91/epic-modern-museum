import Button from '@mui/material/Button';
import { Card, CardContent, CardHeader, CardMedia } from '@mui/material';


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
            <Button variant="contained">Learn more</Button>
        </Card>
    );
}

export default PaintingCard;

import { Link } from 'react-router-dom';
import { Button, Card, CardContent, CardHeader, CardMedia } from '@mui/material';


function MuseumCard({ museum }) {
    const { bio, id, location, name } = museum;

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                title={name}
            />
            <CardContent>
                {bio}
                {location}
            </CardContent>
            <Link to={`/museums/${museum.id}`} key={museum.id}><Button variant="contained">Explore!</Button></Link>
        </Card>
    );
}

export default MuseumCard;

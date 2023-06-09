import { Link } from 'react-router-dom';
import { Button, Card, CardContent, CardHeader } from '@mui/material';


function MuseumCard({ museum }) {
    const { bio, location, name } = museum;

    return (
        <Card sx={{ maxWidth: 345, maxheight: 300 }}>
            <CardHeader
                title={name}
            />
            <CardContent>
                {bio}
                {location}
            </CardContent>
            <Link to={`/locations/${museum.id}`} key={museum.id}><Button variant="contained" sx={{ margin: 2 }}>Explore!</Button></Link>
        </Card>
    );
}

export default MuseumCard;

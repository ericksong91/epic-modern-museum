import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';


function MuseumCard({ paint }) {
    const { bio, id, img_url, museum_id, user_id, name } = paint;

    return (
        <div className="MuseumCard">
            {name}
            {bio}
        </div>
    );
}

export default MuseumCard;

import '../../css/App.css';
import { Link } from "react-router-dom"
import Button from '@mui/material/Button';

function Homepage() {

    return (
        <div className="Homepage">
            <Link to={'/museums'}><Button variant="contained">Explore Museums as a Guest</Button></Link>
            <Link to={'/login'}><Button variant="contained">Artist Login</Button></Link>
        </div>
    );
}

export default Homepage;

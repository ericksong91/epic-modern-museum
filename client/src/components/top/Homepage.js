import { useContext } from 'react';
import '../../css/App.css';
import { Link } from "react-router-dom"
import Button from '@mui/material/Button';
import { UserContext } from '../context/user';

function Homepage() {
    const { user } = useContext(UserContext);

    return (
        <div className="Homepage">
            {!user ? <Link to={'/museums'}><Button variant="contained">Explore Museums as a Guest</Button></Link> :
                <Link to={'/museums'}><Button variant="contained">Explore Museums</Button></Link>}
            {!user ? <Link to={'/login'}><Button variant="contained">Artist Login</Button></Link> :
                <Link to={'/profile'}><Button variant="contained">Artist Profile</Button></Link>}
        </div>
    );
}

export default Homepage;

import { useEffect, useContext } from 'react';
import '../../css/App.css';
import { Link } from "react-router-dom"
import Button from '@mui/material/Button';
import { UserContext } from '../context/user';

function Homepage() {
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        fetch("/me").then((r) => {
            if (r.ok) {
                r.json()
                    .then((user) => setUser(user));
            }
        });
    }, [setUser]);

    return (
        <div className="Homepage">
            <Link to={'/museums'}><Button variant="contained">Explore Museums as a Guest</Button></Link>
            {!user ? <Link to={'/login'}><Button variant="contained">Artist Login</Button></Link> : 
            <Link to={'/profile'}><Button variant="contained">Artist Profile</Button></Link>}
        </div>
    );
}

export default Homepage;

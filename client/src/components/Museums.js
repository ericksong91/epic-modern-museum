import { Link } from "react-router-dom"
import Button from '@mui/material/Button';

function Museums({ museums }) {
    const museumList = museums.map((museum) => {
        return (
            <Link to={`/users/${museum.id}`}>
                <Button variant="contained"><h2 key={museum.id}>{museum.name}</h2></Button>
            </Link>
        )
    })

    return (
        <div className="Museums">
            <h1>Here is a list of all museums:</h1>
            {museumList}
        </div>
    );
}

export default Museums;

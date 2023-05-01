import { Link } from "react-router-dom";
import Button from '@mui/material/Button';


function Museums({ museums }) {
    const museumList = museums.map((museum) => {
        return (
            <Link to={`/museums/${museum.id}`} key={museum.id}>
                <Button variant="contained"><h2>{museum.name}</h2></Button>
            </Link>
        )
    })

    return (
        <div className="Museums">
            <h1>Here is a list of all museums:</h1>
            {museumList}

            <Link to={"/"}><Button variant="contained">Return to Home</Button></Link>
        </div>
    );
}

export default Museums;

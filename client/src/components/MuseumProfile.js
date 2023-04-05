import { Link, useParams } from "react-router-dom"
import Button from '@mui/material/Button';

function MuseumProfile({ museums }) {
    const museumId = parseInt(useParams().id)

    //Filter museum from list
    const museumFilter = museums.filter((museum)=>{
        return museum.id === museumId
    })


    //Filter paintings from Museum
    const paintingsFilter = museumFilter[0].paintings.map((paint)=>{
        return <li>{paint.name}</li>
    })

    //Filter users from Museum
    const usersFilter = museumFilter[0].users.map((user)=>{
        return <li>{user.username}</li>
    })


    return (
        <div className="MuseumProfile">
            <h1>You have arrived!</h1>
            <h2>{museumFilter[0].name}</h2>
            <h2>{museumFilter[0].location}</h2>
            <h3>{museumFilter[0].bio}</h3>

            <h2>List of Paintings:</h2>
            {paintingsFilter}

            <h2>List of our Great Artists:</h2>
            {usersFilter}
            
        </div>
    );
}

export default MuseumProfile;

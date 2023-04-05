import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Button from '@mui/material/Button';

function MuseumProfile({ museums }) {
    const index = parseInt(useParams().id);
    const museumObj = museums.find((museum)=> museum.id === index)
    const [paintings, setPaintings] = useState([]);

    useEffect(()=>{
        museums.length === 0 ? setPaintings([]) : setPaintings(museumObj.paintings)
    }, [index, museums])

    //Filter paintings from Museum
    const paintingsFilter = paintings.map((paint)=>{
        return <li>{paint.name}</li>
    })

    console.log(museumObj)

    return (
        <div className="MuseumProfile">
            <h1>You have arrived!</h1>
            <h2>{museumObj.location}</h2>
            <h2>{museumObj.name}</h2>
            <h3>{museumObj.bio}</h3>

            <h2>List of Paintings:</h2>
            {paintingsFilter}
            
        </div>
    );
}

export default MuseumProfile;

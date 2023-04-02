import '../../css/App.css';
import { useEffect, useState } from 'react';

function Homepage() {
    const [museums, setMuseums] = useState([]);

    useEffect(() => {
        fetch("/museums")
            .then((r) => r.json())
            .then((data) => setMuseums(data))
            .catch(() => alert("Error!"))
    }, [])

    const museumList = museums.map((museum)=>{
        return <li>{museum.name}</li>
    })


    return (
        <div className="Homepage">
            {museumList}
        </div>
    );
}

export default Homepage;

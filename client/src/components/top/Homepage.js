import '../../css/App.css';
import { useEffect, useState } from 'react';

function Homepage() {
    const [museums, setMuseums] = useState([]);

    useEffect(() => {
        fetch("/museums")
            .then((r) => r.json())
            .then((data) => console.log(data))
    }, [])

    return (
        <div className="Homepage">
        </div>
    );
}

export default Homepage;

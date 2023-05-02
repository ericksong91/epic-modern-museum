import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function PaintingProfile({ museums }) {
    const index = parseInt(useParams().id);
    const [painting, setPainting] = useState({});

    useEffect(() => {
        museums.forEach((muse) => {
            const foundPainting = muse.paintings.filter((paint) => parseInt(paint.id) === index)

            if (foundPainting.length > 0) {
                setPainting(foundPainting[0])
            }
        })
    }, [museums])

    return (
        <div className="PaintingProfile">

        </div>
    );
}

export default PaintingProfile;

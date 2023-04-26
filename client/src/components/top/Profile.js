import { useContext } from 'react';
import { UserContext } from '../context/user';
import '../../css/App.css';

function Profile() {
    const { user } = useContext(UserContext);

    console.log(user)

    const userPaintings = user.paintings.map((paint) => <li>{paint.name}</li>)
    const userMuseums = user.museums.map((muse) => <li>{muse.name}</li>)

    return (
        <div className="Profile">
            <h1>Paintings</h1>
            {userPaintings}

            <h1>Part of these Museums:</h1>
            {userMuseums}
        </div>
    );
}

export default Profile;

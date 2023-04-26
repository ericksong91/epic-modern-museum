import { useContext } from 'react';
import { UserContext } from '../context/user';
import '../../css/App.css';

function Profile() {
    const { user } = useContext(UserContext);

    console.log(user)

    return (
        <div className="Profile">

        </div>
    );
}

export default Profile;

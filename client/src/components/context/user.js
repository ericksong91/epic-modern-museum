import React from 'react';

const UserContext = React.createContext();

function UserProvider ({}) {
    return <UserContext.Provider value={null}></UserContext.Provider>
}

export {UserContext, UserProvider}
import React, { useState, useEffect } from 'react';

const UserContext = React.createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [artists, setArtists] = useState([]);

    // console.log(artists)

    useEffect(() => {
        fetch('/me')
            .then(res => {
                if (res.ok) {
                    res.json().then((data) => setUser(data))
                }
            })
    }, []);

    useEffect(() => {
        fetch("/users")
            .then((r) => {
                if (r.ok) {
                    r.json().then((data) => setArtists(data))
                } else {
                    r.json().then((error) => alert(error.errors))
                }
            })
    }, []);

    function logout() {
        fetch("/logout", { method: "DELETE" })
            .then((r) => {
                if (r.ok) {
                    setUser(null)
                }
            })
    };

    function login(username, password, setIsLoading, setErrors) {
        setErrors([]);
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        })
            .then((r) => {
                setIsLoading(false);
                if (r.ok) {
                    r.json().then((data) => setUser(data));
                } else {
                    r.json().then((error) => setErrors(error.errors));
                }
            });
    };

    function signup(username, password, passwordConfirmation, bio, setIsLoading, setErrors) {
        setErrors([]);
        fetch("signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password,
                password_confirmation: passwordConfirmation,
                bio
            })
        })
            .then((r) => {
                setIsLoading(false);
                if (r.ok) {
                    r.json().then((data) => {
                        setUser(data);
                        setArtists([...artists, data]);
                    });
                } else {
                    r.json().then((error) => setErrors(error.errors));
                }
            })
    };

    function onDelete(id, paintings, setErrors, setIsLoading, setPaintings) {
        fetch(`/users/${id}`, {
            method: 'DELETE'
        })
            .then((r) => {
                setIsLoading(false);
                if (r.ok) {
                    const newPaintingList = [];
                    const filteredArtists = [];
                    artists.forEach((artist) => {
                        if (artist.id === id) {
                            return
                        } else {
                            return filteredArtists.push(artist)
                        }
                    });
                    filteredArtists.forEach((artist) => {
                        paintings.forEach((painting) => {
                            if (painting.user_id === artist.id) {
                                return newPaintingList.push(painting)
                            }
                        })
                    });
                    newPaintingList.sort((a, b) => a.id - b.id);
                    setUser(null);
                    setArtists(filteredArtists);
                    setPaintings(newPaintingList);
                } else {
                    r.json().then((error) => setErrors(error.errors));
                }
            })
    };

    return (
        <UserContext.Provider value={{ user, artists, setUser, logout, login, signup, onDelete }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }
import React, { useState, useEffect } from 'react';

const UserContext = React.createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [artists, setArtists] = useState([]);

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

    function onDelete(id, museums, setErrors, setIsLoading, setMuseums) {
        fetch(`/users/${id}`, {
            method: 'DELETE'
        })
            .then((r) => {
                setIsLoading(false);
                if (r.ok) {
                    const filteredArtists = artists.filter((artist) => artist.id !== id);
                    const filteredMuseums = museums.map((muse) => {
                        {
                            return {
                                id: muse.id,
                                bio: muse.bio,
                                location: muse.location,
                                name: muse.name,
                                paintings: muse.paintings.filter((paint) => paint.user_id !== id)
                            };
                        };
                    });

                    setUser(null);
                    setMuseums(filteredMuseums);
                    setArtists(filteredArtists);
                } else {
                    r.json().then((error) => setErrors(error.errors));
                };
            });
    };

    return (
        <UserContext.Provider value={{ user, artists, setUser, logout, login, signup, onDelete }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider };
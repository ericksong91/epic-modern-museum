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

    function onDelete(id, setErrors) {
        fetch(`/users/${id}`, {
            method: 'DELETE'
        })
            .then((r) => {
                if (r.ok) {
                    const filteredArtists = artists.map((artist) => {
                        if (artist.id === id) {
                            return
                        } else {
                            return artist
                        }
                    });
                    setUser(null);
                    setArtists(filteredArtists);
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
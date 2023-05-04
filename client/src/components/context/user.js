import React, { useState, useEffect } from 'react';

const UserContext = React.createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        fetch('/me')
            .then(res => {
                if (res.ok) {
                    res.json().then((data) => setUser(data))
                }
            })
    }, [])

    function logout() {
        fetch("/logout", { method: "DELETE" })
            .then((r) => {
                if (r.ok) {
                    setUser(null)
                }
            })
    }

    function login(username, password, setIsLoading) {
        setErrors(null);
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        })
            .then((r) => {
                setIsLoading(false)
                if (r.ok) {
                    r.json().then((data) => setUser(data));
                } else {
                    r.json().then((error) => setErrors(error.errors));
                }
            });
    }

    function signup(username, password, passwordConfirmation, bio, setIsLoading) {
        setErrors(null);
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
                    r.json().then((data) => setUser(data));
                } else {
                    r.json().then((error) => setErrors(error.errors))
                }
            })

    }

    return (
        <UserContext.Provider value={{ user, errors, setUser, logout, login, signup }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }
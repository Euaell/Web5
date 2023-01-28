import React, { createContext, useState, useContext, useEffect } from 'react'

export const stateContext = createContext()

const getFreshContext = () => {
    if (localStorage.getItem("user") === null) {
        localStorage.setItem("user", JSON.stringify(
            {
                userId: null,
                name: "",
                phone: "",
                role: "admin",
            }
        ))
    }

    return JSON.parse(localStorage.getItem("user"));
}

const getFreshToken = () => {
    if (localStorage.getItem("token") === null) {
        localStorage.setItem("token", null)
    }

    return localStorage.getItem("token");
}

export default function useStateContext() {
    const {user, setUser} = useContext(stateContext);
    // token, setToken, resetToken
    const {token, setToken} = useContext(stateContext);

    return {
        user,
        setUser: obj => {
            setUser({...user, ...obj})
            localStorage.setItem("user", JSON.stringify({...user, ...obj}))
        },
        resetUser: () => {
            localStorage.removeItem("user");
            setUser(getFreshContext())
        },
        token,
        setToken: obj => {
            setToken(obj)
            localStorage.setItem("token", obj)
        },
        resetToken: () => {
            localStorage.removeItem("token");
            setToken(getFreshToken())
        },
    }
}

export function ContextProvider({children}) {
    const [user, setUser] = useState(getFreshContext());
    const [token, setToken] = useState(getFreshToken());

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    useEffect(() => {
        localStorage.setItem("token", token);
    }, [token]);

    return (
        <stateContext.Provider value={{ user, setUser, token, setToken }}>
            {children}
        </stateContext.Provider>
  )
}

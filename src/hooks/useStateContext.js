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

export default function useStateContext() {
    const {user, setUser} = useContext(stateContext);

    return {
        user,
        setUser: obj => {
            setUser({...user, ...obj})
        },
        resetUser: () => {
            localStorage.removeItem("user");
            setUser(getFreshContext())
        }
    }
}

export function ContextProvider({children}) {
    const [user, setUser] = useState(getFreshContext());

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    return (
        <stateContext.Provider value={{ user, setUser }}>
            {children}
        </stateContext.Provider>
  )
}

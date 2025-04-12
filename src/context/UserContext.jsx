import axios from "axios";
import { useEffect } from "react";
import { useState, createContext, useContext } from "react";

const URL = "localhost:3000/api";

const UserContext = createContext();
export const useUser = () => useContext(UserContext)

export function UserProvider({ children }) {

    const [ user, setUser ] = useState(null);
    const [ token, setToken ] = useState(null);

    useEffect(() => {
        user ? localStorage.setItem("user", JSON.stringify(user))
            : localStorage.removeItem("user");
        token ? localStorage.setItem("token", token)
            : localStorage.removeItem("token");
    }, [user, token]); 

    async function login(data) {
        try {
            const response = await axios.post(`${URL}/login`, data);
            const { user, token } = response.data;
            setUser(user);
            setToken(token);
            
        } catch (error) {
            console.error("Error during login", error);
            
        }
    }

    function logout() {
        setUser(null);
        setToken(null);
    }


    return (
        <UserContext.Provicer value={{login, logout}}>
            {children}
        </UserContext.Provicer>
    )
}
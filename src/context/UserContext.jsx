import axios from "axios";
import { useEffect, useState, createContext, useContext, useMemo } from "react";
import config from '../config/env.config';



const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export function UserProvider({ children }) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [token, setToken] = useState(() => {
        return localStorage.getItem("token") || null;
    });

    const isAdmin = useMemo(() => {
        return user?.role === "admin";
    }, [user]);

    useEffect(() => {
        user
            ? localStorage.setItem("user", JSON.stringify(user))
            : localStorage.removeItem("user");

        token
            ? localStorage.setItem("token", token)
            : localStorage.removeItem("token");
    }, [user, token]);

    async function login(credentials) {
        try {
            const response = await axios.post(`${config.API_URL}/login`, credentials);
            const { user, token } = response.data;
            setUser(user);
            setToken(token);
            return { success: true };
        } catch (error) {
            console.error("Error during login", error);
            return {
                success: false,
                message: error.response?.data?.message || "Error al iniciar sesión",
            };
        }
    }

    function logout() {
        setUser(null);
        setToken(null);
    }

    return (
        <UserContext.Provider value={{ user, token, isAdmin, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}

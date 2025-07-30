import { useEffect, useState, createContext, useContext, useMemo } from "react";
import config from '../config/env.config';
import api from "../utils/axiosInstance";

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
            const response = await api.post(`${config.API_URL}/login`, credentials);
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

    async function getUserData() {
        try {
            if (!user?._id || !token) return;

            const res = await api.get(`${config.API_URL}/users/${user._id}`);

            if (res.data?.user) {
                setUser(res.data.user);
            }
        } catch (error) {
            console.error("Error al obtener datos del usuario", error);
        }
    }

    async function updateProfileImage(file) {
        if (!user?._id || !token) return;

        try {
            const formData = new FormData();
            formData.append("image", file);

            const res = await api.put(`${config.API_URL}/users/${user._id}/profile-image`, formData);

            if (res.data?.profileImage) {
                setUser(prev => ({ ...prev, profileImage: res.data.profileImage }));
            }

            return { success: true };
        } catch (error) {
            console.error("Error al subir imagen de perfil", error);
            return {
                success: false,
                message: error.response?.data?.message || "No se pudo actualizar la imagen",
            };
        }
    }

    return (
        <UserContext.Provider value={{ user, token, isAdmin, login, logout, getUserData, updateProfileImage }}>
            {children}
        </UserContext.Provider>
    );
}
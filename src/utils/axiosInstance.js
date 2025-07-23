import axios from "axios";
import config from "../config/env.config";
import { toast } from "react-hot-toast";

const api = axios.create({
    baseURL: config.API_URL,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        config.headers["Content-Type"] = "application/json";

        if (token) {
            config.headers["access_token"] = token;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            toast.error("Tu sesión expiró. Iniciá sesión nuevamente.");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;
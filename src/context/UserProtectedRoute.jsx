import { Navigate } from "react-router-dom";
import { useUser } from "./UserContext";

export default function UserProtectedRoute({ children }) {
    const { user, token } = useUser();

    if (!user || !token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
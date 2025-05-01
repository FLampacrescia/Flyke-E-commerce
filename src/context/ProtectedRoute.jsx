import { Navigate } from "react-router-dom";
import { useUser } from "./UserContext";

export default function ProtectedRoute({ children }) {
  const { user, isAdmin } = useUser();

  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
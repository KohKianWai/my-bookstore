import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children, allowedRoles = []}) {

    const user = JSON.parse(
        localStorage.getItem("user")
    )

    if (!user) {
        return <Navigate to="/" />;
    }

    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

    if (roles.length > 0 && !roles.includes(user.role)) {
        return <Navigate to="/" />;
    }

    return children;
}
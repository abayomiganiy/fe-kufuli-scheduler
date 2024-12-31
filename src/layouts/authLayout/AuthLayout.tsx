import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/auth.hook";

const AuthLayout: React.FC = () => {
    const { token } = useAuth();

    if (token && token !== undefined) {
        return <Navigate to="/" replace />;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
};

export default AuthLayout;

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../hooks/auth.hook";

const AuthLayout: React.FC = () => {
    const { token, isLoading } = useAuthContext();

    if (isLoading) {
        return <div>Loading...</div>; // Or a spinner component
    }

    if (token) {
        return <Navigate to="/" replace />;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
};

export default AuthLayout;

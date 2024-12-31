import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/auth.hook";

const AuthLayout: React.FC = () => {
    const { token } = useAuth();
    const { state } = useLocation();

    if (token) {
        return <Navigate to={state?.from?.pathname || "/"} replace />;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
};

export default AuthLayout;

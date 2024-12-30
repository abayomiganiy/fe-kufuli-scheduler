import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/auth.hook";

const DashboardLayoutPlain: React.FC = () => {
    const { token } = useAuth();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="min-h-full">
            <Outlet />
        </div>
    );
};

export default DashboardLayoutPlain;

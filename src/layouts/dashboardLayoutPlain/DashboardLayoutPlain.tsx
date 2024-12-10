import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../hooks/auth.hook";

const DashboardLayoutPlain: React.FC = () => {
    const { token, isLoading } = useAuthContext();

    if (isLoading) {
        return <div>Loading...</div>;
    }

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

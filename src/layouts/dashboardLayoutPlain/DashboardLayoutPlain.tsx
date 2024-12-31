import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/auth.hook";

const DashboardLayoutPlain: React.FC = () => {
    const { token } = useAuth();
    const location = useLocation();

    if (!token) {
        return <Navigate to="/login" state={{from: location}} replace />;
    }

    return (
        <div className="min-h-full">
            <Outlet />
        </div>
    );
};

export default DashboardLayoutPlain;

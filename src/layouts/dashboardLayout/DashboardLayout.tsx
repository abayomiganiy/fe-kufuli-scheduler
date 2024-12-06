import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../hooks/auth.hook";
import SideNavBar from "../../components/sideNavBar";

const DashboardLayout: React.FC = () => {
    const { token, isLoading } = useAuthContext();

    if (isLoading) {
        return <div>Loading...</div>; // Or a spinner component
    }

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div>
            <SideNavBar />
            <div className="ml-72">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;

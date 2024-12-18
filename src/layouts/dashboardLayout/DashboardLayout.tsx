import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../hooks/auth.hook";
import SideNavBar from "../../components/sideNavBar";
import TopNavBar from "../../components/topNavBar";
import UpgradeCard from "../../components/upgradeCard";

const DashboardLayout: React.FC = () => {
    const { token, isLoading } = useAuthContext();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="min-h-full">
            <SideNavBar />
            <div className="laptop:ml-72 laptop:px-8 px-4 laptop:mt-8 mt-10 h-auto flex flex-col gap-6">
                <TopNavBar />
                <UpgradeCard />
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;

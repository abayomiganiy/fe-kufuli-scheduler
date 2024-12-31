import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import SideNavBar from "../../components/sideNavBar";
import TopNavBar from "../../components/topNavBar";
import UpgradeCard from "../../components/upgradeCard";
import { useAuth } from "../../hooks/auth.hook";

const DashboardLayout: React.FC = () => {
    const { token } = useAuth();
    const [showSideNavBar, setshowSideNavBar] = useState(false);

    const onCloseSideNavBar = () => {
        setshowSideNavBar(false);
    };

    if (token === null) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="">
            <SideNavBar
                showSideNavBar={showSideNavBar}
                onCloseSideNavBar={onCloseSideNavBar}
            />
            <div className="laptop:ml-72 laptop:px-8 px-4 laptop:mt-8 mt-16 h-auto flex flex-col gap-6">
                <TopNavBar setshowSideNavBar={setshowSideNavBar} />
                <UpgradeCard />
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;

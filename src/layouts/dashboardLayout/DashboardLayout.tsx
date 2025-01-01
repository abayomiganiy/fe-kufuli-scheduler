import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SideNavBar from "../../components/sideNavBar";
import TopNavBar from "../../components/topNavBar";
import UpgradeCard from "../../components/upgradeCard";
import { useAuth } from "../../hooks/auth.hook";

const DashboardLayout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { token } = useAuth();
    const [showSideNavBar, setshowSideNavBar] = useState(false);

    const onCloseSideNavBar = () => {
        setshowSideNavBar(false);
    };

    useEffect(() => {
        if (token === null) {
            navigate("/login", { replace: true });
        }
    }, [location, navigate, token]);

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

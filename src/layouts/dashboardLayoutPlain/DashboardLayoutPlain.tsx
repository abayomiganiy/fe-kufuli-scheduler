import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth.hook";

const DashboardLayoutPlain: React.FC = () => {
    const { token } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (token === null) {
            navigate("/login", { replace: true });
        }
    }, [location, navigate, token]);

    return (
        <div className="min-h-full">
            <Outlet />
        </div>
    );
};

export default DashboardLayoutPlain;

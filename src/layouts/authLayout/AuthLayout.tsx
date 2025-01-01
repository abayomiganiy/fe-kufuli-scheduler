import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth.hook";

const AuthLayout: React.FC = () => {
    const { token } = useAuth();
    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate("/", { replace: true });
        }
    }, [navigate, state?.from?.pathname, token]);

    return (
        <div>
            <Outlet />
        </div>
    );
};

export default AuthLayout;

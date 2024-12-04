import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/auth.hook";

const AuthLayout: React.FC = () => {
    const token = useAuthContext();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate a short delay to allow token fetching
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <div>Loading...</div>; // Or a spinner component
    }

    if (token) {
        return <Navigate to="/" replace />;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
};

export default AuthLayout;

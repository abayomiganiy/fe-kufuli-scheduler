import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "./layouts/authLayout";
import DashboardLayout from "./layouts/dashboardLayout";
import DashboardLayoutPlain from "./layouts/dashboardLayoutPlain";
import Campaigns from "./pages/campaigns";
import ConnectAccount from "./pages/connectAccount";
import ForgotPassword from "./pages/forgotPassword";
import Home from "./pages/home";
import Influencers from "./pages/influencers";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import VerifyAccount from "./pages/verifyAccount";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <DashboardLayout />,
        children: [
            { index: true, element: <Navigate to="/dashboard" /> },
            { path: "/dashboard", element: <Home /> },
            { path: "/campaigns", element: <Campaigns /> },
            { path: "/influencers", element: <Influencers /> },
        ],
    },
    {
        path: "/",
        element: <DashboardLayoutPlain />,
        children: [{ path: "/connect-account", element: <ConnectAccount /> }],
    },
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            { path: "/login", element: <Login /> },
            { path: "/signup", element: <SignUp /> },
            { path: "/forgot-password", element: <ForgotPassword /> },
            { path: "/verify-account", element: <VerifyAccount /> },
        ],
    },
]);

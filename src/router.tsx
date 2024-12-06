import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "./pages/home";
import AuthLayout from "./layouts/authLayout";
import DashboardLayout from "./layouts/dashboardLayout";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import ForgotPassword from "./pages/forgotPassword";
import VerifyAccount from "./pages/verifyAccount";
import ConnectAccount from "./pages/connectAccount";
import Campaigns from "./pages/campaigns";
import Influencers from "./pages/influencers";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <DashboardLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "/campaigns", element: <Campaigns /> },
            { path: "/influencers", element: <Influencers /> },
        ],
    },
    {
        path: "/",
        element: <Outlet />,
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

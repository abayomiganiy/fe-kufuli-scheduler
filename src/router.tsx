import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import AuthLayout from "./layouts/authLayout";
import DashboardLayout from "./layouts/dashboardLayout";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import ForgotPassword from "./pages/forgotPassword";
import VerifyAccount from "./pages/verifyAccount";
import ConnectAccount from "./pages/connectAccount";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <DashboardLayout />,
        children: [{ path: "/", element: <Home /> }],
    },
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            { path: "/login", element: <Login /> },
            { path: "/signup", element: <SignUp /> },
            { path: "/forgot-password", element: <ForgotPassword /> },
            { path: "/verify-account", element: <VerifyAccount /> },
            { path: "/connect-account", element: <ConnectAccount /> },
        ],
    },
]);

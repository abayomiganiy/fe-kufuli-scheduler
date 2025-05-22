import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "./layouts/authLayout";
import DashboardLayout from "./layouts/dashboardLayout";
import DashboardLayoutPlain from "./layouts/dashboardLayoutPlain";
import Campaign from "./pages/campaign";
import Campaigns from "./pages/campaigns";
import ConnectAccount from "./pages/connectAccount";
import ForgotPassword from "./pages/forgotPassword";
import Home from "./pages/home";
import Influencers from "./pages/influencers";
import Login from "./pages/login";
import Pricing from "./pages/pricing";
import SignUp from "./pages/signUp";
import VerifyAccount from "./pages/verifyAccount";
import CreateCampaign from "./pages/createCampaign";
import ErrorPage from "./components/ErrorPage";
import ErrorBoundary from "./components/ErrorBoundary ";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <DashboardLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Navigate to="/dashboard" /> },
            {
                path: "/dashboard",
                element: (
                    <ErrorBoundary>
                        <Home />
                    </ErrorBoundary>
                ),
            },
            {
                path: "/campaigns",
                element: (
                    <ErrorBoundary>
                        <Campaigns />
                    </ErrorBoundary>
                ),
            },
            {
                path: "/create-campaign",
                element: (
                    <ErrorBoundary>
                        <CreateCampaign />
                    </ErrorBoundary>
                ),
            },
            {
                path: "/campaigns/:id",
                element: (
                    <ErrorBoundary>
                        <Campaign />
                    </ErrorBoundary>
                ),
            },
            {
                path: "/influencers",
                element: (
                    <ErrorBoundary>
                        <Influencers />
                    </ErrorBoundary>
                ),
            },
            {
                path: "/pricing",
                element: (
                    <ErrorBoundary>
                        <Pricing />
                    </ErrorBoundary>
                ),
            },
        ],
    },
    {
        path: "/",
        element: <DashboardLayoutPlain />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/connect-account",
                element: (
                    <ErrorBoundary>
                        <ConnectAccount />
                    </ErrorBoundary>
                ),
            },
        ],
    },
    {
        path: "/",
        element: <AuthLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/login",
                element: (
                    <ErrorBoundary>
                        <Login />
                    </ErrorBoundary>
                ),
            },
            {
                path: "/signup",
                element: (
                    <ErrorBoundary>
                        <SignUp />
                    </ErrorBoundary>
                ),
            },
            {
                path: "/forgot-password",
                element: (
                    <ErrorBoundary>
                        <ForgotPassword />
                    </ErrorBoundary>
                ),
            },
            {
                path: "/verify-account",
                element: (
                    <ErrorBoundary>
                        <VerifyAccount />
                    </ErrorBoundary>
                ),
            },
        ],
    },
]);

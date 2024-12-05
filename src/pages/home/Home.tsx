import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/auth.hook";
import { useGetUser } from "../../hooks/user.hook";

const Home: React.FC = () => {
    const notify = () => toast.success("Yay!");
    const { mutate: logout } = useLogout();
    const { data: user } = useGetUser();
    return (
        <div className="flex justify-between">
            <div>Hello {user?.email}</div>
            <button onClick={notify}>Toast me</button>
            <Link to="/login">Login</Link>
            <Link to="/campaigns">Campaigns</Link>
            <button
                onClick={() => {
                    logout();
                }}
            >
                Logout
            </button>
        </div>
    );
};

export default Home;

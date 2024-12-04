import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/auth.hook";

const Home: React.FC = () => {
    const notify = () => toast.success("Yay!");
    const { mutate: logout } = useLogout();
    return (
        <div>
            Home
            <button onClick={notify}>Toast me</button>
            <Link to="/login">Login</Link>
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

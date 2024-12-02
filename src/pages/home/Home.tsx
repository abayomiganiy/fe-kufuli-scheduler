import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
    const notify = () => toast.success("Yay!");
    return (
        <div>
            Home
            <button onClick={notify}>Toast me</button>
            <Link to="/login">Login</Link>
        </div>
    );
};

export default Home;

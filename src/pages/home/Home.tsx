import React from "react";
import toast from "react-hot-toast";

const Home: React.FC = () => {
    const notify = () => toast.success("Yay!");
    return (
        <div>
            Home
            <button onClick={notify}>Toast me</button>
            <svg
            className="blur-3xl"
                width="568"
                height="378"
                viewBox="0 0 568 378"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <ellipse
                    cx="317.806"
                    cy="322.5"
                    rx="322.5"
                    ry="317.806"
                    transform="rotate(90 317.806 322.5)"
                    fill="#ACDCFF"
                />
            </svg>
        </div>
    );
};

export default Home;

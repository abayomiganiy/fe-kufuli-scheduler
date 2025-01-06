import React from "react";
import { useLocation } from "react-router-dom";

const Campaign: React.FC = () => {
    const location = useLocation();
    console.log(location.state);
    return (
        <div>
            <div>Campaign</div>
            <div>{JSON.stringify(location.state)}</div>
        </div>
    );
};

export default Campaign;

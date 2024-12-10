import React from "react";
import { useGetContacts } from "../../hooks/contact.hook";

const Home: React.FC = () => {
    const { data: contacts } = useGetContacts();
    console.log(contacts);
    return (
        <div className="flex justify-between">
            <div>Hello</div>
        </div>
    );
};

export default Home;

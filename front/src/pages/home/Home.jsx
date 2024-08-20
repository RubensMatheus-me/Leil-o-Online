import React from "react";
import "./Home.css";    


import Logout from "../../components/logout/Logout";
import Sidebar from "../../components/sidebar/Sidebar";


const Home = () => {

    return (
        <div>
            <h1>Página inicial</h1>
            <div>
                <Logout className = "logout-button"/>
            </div>
        </div>
    );
}
export default Home;
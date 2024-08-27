import React from "react";
import "./Header.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Logout from "../../components/logout/Logout";

const Header = () => {
    return (
        <div className="header">
            <Sidebar className="sidebar"/>
            <Logout className="logout-button" />

            
        </div>
    );
}
export default Header;
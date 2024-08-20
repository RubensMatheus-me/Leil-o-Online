import React from "react";
import "./Header.css";
import Sidebar from "../../components/sidebar/Sidebar";

const Header = () => {
    return (
        <div className="header">
            <Sidebar className="sidebar"/>
            <h1>Menu</h1>
        </div>
    );
}
export default Header;
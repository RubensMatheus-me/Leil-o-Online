import React from "react";
import './SimpleLayout.css';
import Header from "./header/Header";

const SimpleLayout = ({ children }) => {
    return (
        <div className="simple-container">
            <div className="content">
                {children}
            </div>
        </div>
    );
}

export default SimpleLayout;

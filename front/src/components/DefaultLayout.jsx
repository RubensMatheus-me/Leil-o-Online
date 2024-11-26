import React from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import './DefaultLayout.css';

const DefaultLayout = ({ children }) => {
    return (
        <div className="app-container">
            <Header />
            <div className="main-content">
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;

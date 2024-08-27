import React from "react";
import {useNavigate} from "react-router-dom";
import { Button } from 'primereact/button';
import './Logout.css';

const Logout = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        localStorage.removeItem("token");
        navigate("/login");

    }

    return (
        
        <>
        <div className="button">
            <Button className="logout-button" label="Logout" onClick={logout} />
        </div>
        
        </>
    );
}
export default Logout;
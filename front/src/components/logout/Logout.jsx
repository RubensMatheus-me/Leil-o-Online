import React from "react";
import {useNavigate} from "react-router-dom";
import { Button } from 'primereact/button';

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
        <Button className = "logout-button" label = "Logout" onClick = {logout}/>
        </>
    );
}
export default Logout;
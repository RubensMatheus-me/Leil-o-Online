import React from "react";
import {useNavigate} from "react-router-dom";
import { Button } from 'primereact/button';
import './Logout.css';

const Logout = () => {
    const navigate = useNavigate();

    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("token");
    navigate("/login");

}


export default Logout;
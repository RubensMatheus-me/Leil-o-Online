import React from "react";
import './Login.css';
import '../styles/Card.css';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { useState } from "react";
import { useNavigate} from 'react-router-dom';

const Login = () => {

    const [user, setUser] = useState({email: "", password:""});
    const navigate = useNavigate();

    const [adminUser] = useState({ email: "admin", password: "admin" });

    const handleChange = (input) => {
        const {name, value } = input.target;
        setUser(prevUser => ({...prevUser, [name]: value}));
    }

    const login = () => {
        const emailRegistered = localStorage.getItem("email");
        const passwordRegistered = localStorage.getItem("password");
        console.log(adminUser.email);

        if ((user.email === emailRegistered && user.password === passwordRegistered) || (user.email === adminUser.email && user.password === adminUser.password)) {
            let token = "tokenBackend";
            localStorage.setItem("token", token);
            navigate("/");

        }
        
    }

    return (
        <div className="container">
            <Card className = "card" title="Login">
                <div className="card-elements">
                    <label htmlFor="email">Email</label>
                    <InputText onChange={handleChange} name = "email"/>

                    <label htmlFor="senha">Senha</label>
                    <Password className="password-input" feedback={false} onChange={handleChange} name="password" toggleMask /> 

                    <Button className="button-login" label="Login" onClick={login}/>
                    <Link className= "link-button-register" to="/register" >
                        <Button label="Cadastro"/>
                    </Link> 
                    <Link className="link-recovery-password" to="/recoveryPassword"> Recuperar Senha </Link>
                </div>
            </Card>
        </div>
    );


}
export default Login;
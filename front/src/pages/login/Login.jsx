import React from "react";
import './Login.css';
import '../styles/Card.css';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="container">
            <Card className = "card" title="Login">
                <div className="card-elements">
                    <label htmlFor="email">Email</label>
                    <InputText />
                    <label htmlFor="senha">Senha</label>
                    <Password className="password-input" feedback={false} toggleMask /> 
                    <Button className="button-login" label="Login"/>
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
import React from "react";
import './Login.css';
import '../styles/Card.css';
import '../styles/DefaultNotification.css';

import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { useState, useRef } from "react";
import { useNavigate} from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { Messages } from 'primereact/messages';

const Login = () => {


    const [user, setUser] = useState({email: "", password:""});
    const navigate = useNavigate();

    const [submit, setSubmitted] = useState(false);

    const {t} = useTranslation();

    const [adminUser] = useState({ email: "admin", password: "admin" });

    const handleChange = (input) => {
        
        const {name, value } = input.target;
        setUser(prevUser => ({...prevUser, [name]: value}));
    }
    
    const msgs = useRef(null);

    const login = () => {
        msgs.current.clear();
        setSubmitted(true);

        const emailRegistered = localStorage.getItem("email");
        const passwordRegistered = localStorage.getItem("password");

    
        if ((user.email === emailRegistered && user.password === passwordRegistered) 
        || (user.email === adminUser.email && user.password === adminUser.password)) {

            msgs.current.show({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Login realizado com sucesso!',
                sticky: true,
            });
            setTimeout( () => {
                let token = "tokenBackend";
                localStorage.setItem("token", token);
                navigate("/");
            }, 1500);// 2000 milissegundos = 2 segundos
            
        } else {
            msgs.current.show({
            severity: 'error',
            summary: 'Erro',
            detail: 'Email ou senha incorretos!',
            sticky: true,
            });
            return;
        }

        
    }

    return (
        <div className="container">
            <div className="notification">
                <Messages className="notification-message" ref={msgs} />
            </div>
            <Card className = "card" title="Login">
                <div className="card-elements">
                    <label htmlFor="email">E-mail</label>
                    <InputText 
                        onChange={handleChange} 
                        name = "email"
                        invalid={submit && !user.email}
                    />

                    <label htmlFor="senha">Senha</label>
                    <Password 
                        className="password-input" 
                        feedback={false} 
                        onChange={handleChange} 
                        name="password" 
                        invalid={submit && !user.password}
                        toggleMask 
                    /> 

                    <Button 
                        className="button-login" 
                        label={t('login')} 
                        onClick={login}
                    />
                    <Link 
                    className= "link-button-register" to="/register" >
                        <Button label="Cadastro"/>
                    </Link> 
                    <Link className="link-recovery-password" to="/recoveryPassword"> Recuperar Senha </Link>
                </div>
            </Card>
        </div>
    );


}
export default Login;
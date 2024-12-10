import React, { useState, useRef } from "react";
import './Login.css';
import '../styles/DefaultCard.css';
import '../styles/DefaultNotification.css';

import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { Messages } from 'primereact/messages';
import ButtonLanguage from "../../components/buttonLanguage/ButtonLanguage"; 
import PersonService from "../../services/PersonService";

const Login = () => {
    const [user, setUser] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const [submit, setSubmitted] = useState(false);
    const { t } = useTranslation();
    const [adminUser] = useState({ email: "admin", password: "admin" });
    const msgs = useRef(null);
    const personService = new PersonService();

    const handleChange = (input) => {
        const { name, value } = input.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    }

    const login = async () => {
        console.log(user);
        msgs.current.clear();
        setSubmitted(true);
        //const emailRegistered = localStorage.getItem("email");
        //const passwordRegistered = localStorage.getItem("password");
        

        try {
            const response = await personService.login(user);
            let token = response.token;
            localStorage.setItem("token", token);
            localStorage.setItem("email", user.email);
            navigate("/");
           
        }catch {
            msgs.current.show({
                severity: 'error',
                summary: 'Erro',
                detail: t('login.error-message-login'),
                sticky: true,
            });
        }
    }
    /*
    if ((user.email === emailRegistered && user.password === passwordRegistered)
        || (user.email === adminUser.email && user.password === adminUser.password)) {

        msgs.current.show({
            severity: 'success',
            summary: 'Sucesso',
            detail: t('login.sucess-message-login'),
            sticky: true,
        });
        setTimeout(() => {
            let token = "tokenBackend";
            localStorage.setItem("token", token);
            navigate("/");
        }, 1500);
    } else {
        msgs.current.show({
            severity: 'error',
            summary: 'Erro',
            detail: t('login.error-message-login'),
            sticky: true,
        });
        return;
        */
    


    return (
        <div className="container">
            <div className="notification">
                <Messages className="notification-message" ref={msgs} />
            </div>
            <Card className="default-card" title={t('login.title')}>
                <div className="button-language">
                    <ButtonLanguage />
                </div>
                <div className="card-elements">
                    <label htmlFor="email">{t('login.email')}</label>
                    <InputText
                        onChange={handleChange}
                        name="email"
                        invalid={submit && !user.email}
                    />
                    <label htmlFor="password">{t('login.password')}</label>
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
                        label={t('login.submit')}
                        onClick={login}
                    />
                    <Link className="link-button-register" to="/register">
                        <Button label={t('login.register')} />
                    </Link>
                    <Link className="link-recovery-password" to="/recovery-password">
                        {t('login.forgot-password')}
                    </Link>
                </div>
            </Card>
        </div>
    );
}

export default Login;

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

const Login = () => {
    const [user, setUser] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const [submit, setSubmitted] = useState(false);
    const { t, i18n } = useTranslation();
    const [adminUser] = useState({ email: "admin", password: "admin" });
    const msgs = useRef(null);
    const [currentLang, setCurrentLang] = useState(i18n.language);

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        setCurrentLang(language);
    }

    const handleChange = (input) => {
        const { name, value } = input.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    }

    const login = () => {
        msgs.current.clear();
        setSubmitted(true);
        const emailRegistered = localStorage.getItem("email");
        const passwordRegistered = localStorage.getItem("password");

        if ((user.email === emailRegistered && user.password === passwordRegistered)
            || (user.email === adminUser.email && user.password === adminUser.password)) {
            msgs.current.show({
                severity: 'success',
                summary: t('login.successTitle'),
                detail: t('login.successDetail'),
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
                summary: t('login.errorTitle'),
                detail: t('login.errorDetail'),
                sticky: true,
            });
            return;
        }
    }

    const handleIconClick = () => {
        const newLang = currentLang === 'pt' ? 'en' : 'pt';
        changeLanguage(newLang);
    }

    return (
        <div className="container">
            <div className="notification">
                <Messages className="notification-message" ref={msgs} />
            </div>
            <Card className="default-card" title={t('login.title')}>
                <div className="button-language">
                    <Button icon="pi pi-globe"
                        className="language-switcher-button"
                        onClick={handleIconClick}
                        tooltip={currentLang === 'pt' ? 'Switch to English' : 'Mudar para Português'}
                    />
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
                    <Link className="link-recovery-password" to="/recoveryPassword">
                        {t('login.forgot-password')}
                    </Link>
                </div>
            </Card>
        </div>
    );
}

export default Login;

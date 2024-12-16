import React, { useState, useRef } from "react";
import './ChangePassword.css';
import '../styles/DefaultCard.css';
import '../styles/DefaultNotification.css';

import { Card } from 'primereact/card';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { InputText } from 'primereact/inputtext';
import { Messages } from 'primereact/messages';
import ButtonLanguage from "../../components/buttonLanguage/ButtonLanguage";
import PersonService from "../../services/PersonService";

const ChangePassword = () => {

    const [user, setUser] = useState({ email: "", password: "", repeatPassword: "" });
    const navigate = useNavigate();
    const [submit, setSubmitted] = useState(false);
    const { t } = useTranslation();
    const msgs = useRef(null);
    const personService = new PersonService();

    const handleChange = (input) => {
        const { name, value } = input.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    }

    const changePassword = async () => {
        console.log(user);
        msgs.current.clear();
        setSubmitted(true);

        if (user.password !== user.repeatPassword) {
            msgs.current.show({
                severity: 'error',
                summary: 'Erro',
                detail: t('changePassword.passwordMismatch'),
                sticky: true,
            });
            return;
        }

        try {
            const response = await personService.changePassword({
                email: user.email,
                password: user.password,
                repeatPassword: user.repeatPassword
            });

            if (response === "Senha alterada com sucesso!") {
                console.log("Senha alterada com sucesso, redirecionando para login...");

                msgs.current.show({
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: t('changePassword.sucess-message-changePassword'),
                    sticky: true,
                });

                navigate("/login");
            } else {
                msgs.current.show({
                    severity: 'error',
                    summary: 'Erro',
                    detail: t('changePassword.errorMessage'),
                    sticky: true,
                });
            }
        } catch (error) {
            console.error("Erro durante a alteração da senha:", error);
            msgs.current.show({
                severity: 'error',
                summary: 'Erro',
                detail: t('changePassword.errorMessage'),
                sticky: true,
            });
        }
    };


    return (
        <div className="container">
            <div className="notification">
                <Messages className="notification-message" ref={msgs} />
            </div>
            <Card className="default-card" title={t('changePassword.title')}>
                <div className="button-language">
                    <ButtonLanguage />
                </div>
                <div className="card-elements">
                    <label htmlFor="email">{t('changePassword.email')}</label>
                    <InputText
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        invalid={submit && !user.email}
                    />
                    <label htmlFor="password">{t('changePassword.newPassword')}</label>
                    <Password
                        className="password-input"
                        feedback={false}
                        onChange={handleChange}
                        name="password"
                        value={user.password}
                        invalid={submit && !user.password}
                        toggleMask
                    />
                    <label htmlFor="repeatPassword">{t('changePassword.confirmPassword')}</label>
                    <Password
                        className="password-input"
                        feedback={false}
                        onChange={handleChange}
                        name="repeatPassword"
                        value={user.repeatPassword}
                        invalid={submit && !user.repeatPassword}
                        toggleMask
                    />
                    <Button
                        className="button-login"
                        label={t('changePassword.submit')}
                        onClick={changePassword}
                    />
                    <Link className="link-button-register" to="/profile">
                        <Button label={t('changePassword.back')} />
                    </Link>
                </div>
            </Card>
        </div>
    );
}

export default ChangePassword;

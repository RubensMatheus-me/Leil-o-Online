import React, { useState, useRef } from "react";
import "./Register.css";
import '../styles/CenteredElementsCard.css';
import '../styles/DefaultNotification.css';

import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Link, useNavigate } from 'react-router-dom';
import { Messages } from 'primereact/messages';
import { useTranslation } from "react-i18next";

import ButtonLanguage from "../../components/buttonLanguage/ButtonLanguage"; 
import PersonService from "../../services/PersonService";

const Register = () => {
    const {t} = useTranslation();
    const [validateInput, setValidateInput] = useState({
        case: false,
        number: false,
        length: false,
        specialChar: false
    });

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const msgs = useRef(null);
    const navigate = useNavigate(); // Importa e usa o hook useNavigate

    const validatePassword = (password) => {
        const hasUpperCase = /^(?=.*[A-Z]).+$/;
        const hasLowerCase = /^(?=.*[a-z]).+$/;
        const hasNumber = /^(?=.*[0-9]).+$/;
        const hasSpecialChar = /^(?=.*[!@#$%^&*(),.?":{}|<>])/;
        const length = password.length >= 6;

        setValidateInput({
            case: hasUpperCase.test(password) && hasLowerCase.test(password),
            number: hasNumber.test(password),
            specialChar: hasSpecialChar.test(password),
            length
        });
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        validatePassword(newPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleRegister = async () => {
        console.log("Botão de registro clicado");
        msgs.current.clear();
        setSubmitted(true);

        if (!username || !email || !password || !confirmPassword) {
            msgs.current.show({
                severity: 'error',
                summary: 'Erro',
                detail: 'Todos os campos devem ser preenchidos!',
                sticky: true,
            });
            return;
        }

        if (password !== confirmPassword) {
            msgs.current.show({
                severity: 'error',
                summary: 'Erro',
                detail: 'As senhas são diferentes',
                sticky: true,
            });
            return;
        }

        try{
            const personData = {username, email, password};
            const personService = new PersonService();
            await personService.create(personData);

            msgs.current.show({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Registro realizado com sucesso!',
                sticky: true,
            });

            setTimeout(() => {
                navigate("/login");
            }, 1500); 
            
        }catch(error) {
            {
            msgs.current.show({
                severity: 'error',
                summary: 'Erro',
                detail: 'Ocorreu um erro ao registrar o usuário.',
                sticky: true,
            });
        }
    }

        
        setTimeout(() => {
            navigate("/login");
        }, 1500); 
    };

    return (
        <div className="container">
            <div className="notification">
                <Messages className="notification-message" ref={msgs} />
            </div>
            <Card className="default-card" title={t('register.title')}>
                <div className="button-language">
                    <ButtonLanguage/>
                </div>
                <div className="card-elements">
                    <label htmlFor="username">{t('register.name')}</label>
                    <InputText
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        invalid={submitted && !username}
                    />

                    <label htmlFor="email">{t('register.email')}</label>
                    <InputText
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        invalid={submitted && !email}
                    />

                    <label htmlFor="senha">{t('register.password')}</label>
                    <Password
                        id="senha"
                        className="password-input"
                        value={password}
                        promptLabel={t('register.placeholder-password-rules-choose')} 
                        weakLabel={t('register.placeholder-password-rules-weak')} 
                        mediumLabel={t('placeholder-password-rules-medium')} 
                        strongLabel={t('placeholder-password-rules-strong')} 
                        header={null}
                        footer={
                            <div className="password-feedback">
                                <p>{t('register.placeholder-password-rules')}:</p>
                                <p style={{ color: validateInput.case ? 'green' : 'red' }}>
                                    {validateInput.case ? '✔' : '✖'} {t('register.placeholder-password-rules-footer-caracters')}
                                </p>
                                <p style={{ color: validateInput.number ? 'green' : 'red' }}>
                                    {validateInput.number ? '✔' : '✖'} {t('register.placeholder-password-rules-footer-number')}
                                </p>
                                <p style={{ color: validateInput.specialChar ? 'green' : 'red' }}>
                                    {validateInput.specialChar ? '✔' : '✖'} {t('register.placeholder-password-rules-footer-special-caracters')}
                                </p>
                                <p style={{ color: validateInput.length ? 'green' : 'red' }}>
                                    {validateInput.length ? '✔' : '✖'} {t('register.placeholder-password-rules-footer-lenght')}
                                </p>
                            </div>
                        }
                        feedback={true}
                        onChange={handlePasswordChange}
                        toggleMask
                        invalid={submitted && !password}
                    />

                    <label htmlFor="confirmarSenha">{t('register.confirm-password')}</label>
                    <Password
                        id="confirmarSenha"
                        className="password-input"
                        feedback={false}
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        toggleMask
                        invalid={submitted && !confirmPassword}
                    />

                    <Button className="button-login" label={t('register.register')} onClick={handleRegister} />

                    <Link className="link-button-login" to="/login">
                        <Button label={t('register.back')} />
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default Register;

import React, { useRef, useState } from "react";
import "./RecoveryPassword.css";
import '../styles/CenteredElementsCard.css';
import '../styles/DefaultNotification.css';

import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Link, useNavigate } from 'react-router-dom';
import { Messages } from 'primereact/messages';
import { useTranslation } from "react-i18next";

import ButtonLanguage from "../../components/buttonLanguage/ButtonLanguage"; 



const RecoveryPassword = () => {
    const msgs = useRef(null);
    const [email, setEmail] = useState("");
    const [submit, setSubmit] = useState(false);    
    const [code, setCode] = useState("");

    const navigate = useNavigate();

    const generateOTP = () => {
        var a = Math.floor(100000 + Math.random() * 900000);
        a = String(a);
        a = a.substring(0, 4);
        console.log(a);
        setCode(a.toString());
        localStorage.setItem("code", code);
    }
    const {t} = useTranslation();

    const handleRecoveryPassword = () => {
        msgs.current.clear();
        setSubmit(true);
        if (!email) {
            msgs.current.show({
                severity: 'error',
                summary: 'Erro',
                detail: 'Coloque algum e-mail válido',
                sticky: true,
            });
            return;
        }
            msgs.current.show({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Instruções de recuperação de senha enviadas para o seu e-mail!',
                sticky: true,
            });
            generateOTP();

            setTimeout(() => {
                navigate("/recovery-password/code");
            }, 1500); 
        

    }

    return (
        <div className="container">
            <div className="notification">
                <Messages className="notification-message" ref={msgs} />
            </div>
            <Card className="default-card" title={t('recovery-password.title')}>
                <div className="button-language">
                    <ButtonLanguage />
                </div>
                <div className="card-elements">      
                    <label htmlFor="email">{t('recovery-password.email')}</label>
                    <InputText 
                        id="email"
                        type="email" 
                        value = {email} onChange={(e) => setEmail(e.target.value)}
                        invalid = {submit && !email}
                    />
                    <Button
                        className="button-recovery"
                        label={t('recovery-password.submit')}
                        onClick={handleRecoveryPassword}
                    />
                    
                    <Link className="link-button-login" to="/login" >
                        <Button label={t('recovery-password.back')} />
                    </Link> 
                </div>
            </Card>
           
    </div>
    );
}
export default RecoveryPassword;
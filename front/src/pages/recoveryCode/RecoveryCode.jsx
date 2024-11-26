import React, { useRef, useState } from "react";
import './recoveryCode.css';
import '../styles/CenteredElementsCard.css';

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Link, useNavigate } from 'react-router-dom';
import { InputOtp } from 'primereact/inputotp';
import { useTranslation } from "react-i18next";


import ButtonLanguage from "../../components/buttonLanguage/ButtonLanguage"; 



const RecoveryCode = () => {
    const msgs = useRef(null);

    const {t} = useTranslation();

    const navigate = useNavigate();

    const [recoveryCode, setRecoveryCode] = useState({code :""});
    const [submit, setSubmit] = useState(false);

    /*
    const handleChange = (input) => {

        const { code, value } = input.target;
        setRecoveryCode(prevRecoveryCode => ({ ...prevRecoveryCode, [code]: value }));
    }
    */

    const codeHandler = () => {
        setSubmit(true);
        msgs.current.clear();

        const codeRegistered = localStorage.getItem("code");

        if(!recoveryCode) {
            msgs.current.show({
                severity: 'error',
                summary: 'Erro',
                detail: 'Insira o código!',
                sticky: true,
            });
            return
        } else if (codeRegistered === recoveryCode) {
            msgs.current.show({
                severity: 'success',
                summary: 'Successo',
                detail: 'Código aceito!',
                sticky: true,
            });

            setTimeout(() => {
                navigate("/login");
            }, 1500);
        }
        msgs.current.show({
            severity: 'error',
            summary: 'Erro',
            detail: 'Código negado!',
            sticky: true,
        });

    

    }

    return (
        <div className="container">
            <Card className="default-card" title={t('recovery-password-code.title')}>
                <div className="button-language">
                    <ButtonLanguage />
                </div>
                <div className="card-elements">
                    <label htmlFor="code" className="code">{t('recovery-password-code.code')}</label>
                    <div className="input-code">
                        <InputOtp 
                        className = "otp" 
                        integerOnly 
                        //onChange={handleChange}
                        invalid={submit && !recoveryCode}/>
                    </div>
                    <Button
                    label={t('recovery-password-code.submit')}
                    onClick={codeHandler}
                    />
                    <Link className="link-button-login" to="/recovery-password" >
                        <Button label={t('recovery-password-code.back')} />
                    </Link>
                </div>
            </Card>

        </div>
    );
}
export default RecoveryCode;
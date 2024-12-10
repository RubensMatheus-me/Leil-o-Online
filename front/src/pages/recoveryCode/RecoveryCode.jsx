import React, { useRef, useState } from "react";
import './recoveryCode.css';
import '../styles/CenteredElementsCard.css';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Link, useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { useTranslation } from "react-i18next";
import ButtonLanguage from "../../components/buttonLanguage/ButtonLanguage";
import PersonService from "../../services/PersonService"; 
import { Messages } from 'primereact/messages'; 

const RecoveryCode = () => {
    const msgs = useRef(null);  
    const { t } = useTranslation(); 
    const navigate = useNavigate(); 
    const [recoveryCode, setRecoveryCode] = useState("");
    const [submit, setSubmit] = useState(false);
    const personService = new PersonService();

    const codeHandler = async () => {
        setSubmit(true);
        if (msgs.current) msgs.current.clear(); 


        if (!recoveryCode || recoveryCode.length !== 6) {
            if (msgs.current) {
                msgs.current.show({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Insira o código de 6 dígitos!',
                    sticky: true,
                });
            }
            return;
        }
        console.log(recoveryCode);

        try {
            const response = await personService.validateCode({
                email: localStorage.getItem("email"),
                code: recoveryCode,
            });

            if (response === 'Código válido') {
                if (msgs.current) {
                    msgs.current.show({
                        severity: 'success',
                        summary: 'Sucesso',
                        detail: 'Código aceito!',
                        sticky: true,
                    });
                }

                setTimeout(() => {
                    navigate("/change-password");
                }, 1500);
            } else {
                if (msgs.current) {
                    msgs.current.show({
                        severity: 'error',
                        summary: 'Erro',
                        detail: 'Código inválido!',
                        sticky: true,
                    });
                }
            }
        } catch (error) {
            console.error("Erro na validação do código: ", error);
            if (msgs.current) {
                msgs.current.show({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Ocorreu um erro ao validar o código!',
                    sticky: true,
                });
            }
        }
    };

    const handleOtpChange = (e, index) => {
        let code = recoveryCode.split('');
        code[index] = e.target.value;
        setRecoveryCode(code.join(''));
    };

    return (
        <div className="container">
            <div className="notification">
                <Messages ref={msgs} />
            </div>

            <Card className="default-card" title={t('recovery-password-code.title')}>
                <div className="button-language">
                    <ButtonLanguage />
                </div>
                <div className="card-elements">
                    <label htmlFor="code" className="code">{t('recovery-password-code.code')}</label>
                    <div className="input-code">
                        {[...Array(6)].map((_, index) => (
                            <InputText
                                key={index}
                                className="otp-input"
                                maxLength={1}
                                value={recoveryCode[index] || ""}
                                onChange={(e) => handleOtpChange(e, index)}
                                integerOnly
                                style={{ width: "40px", margin: "0 5px" }}
                            />
                        ))}
                    </div>
                    <Button
                        label={t('recovery-password-code.submit')}
                        onClick={codeHandler}
                    />
                    <Link className="link-button-login" to="/recovery-password">
                        <Button label={t('recovery-password-code.back')} />
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default RecoveryCode;

import React, { useRef, useState } from "react";
import './recoveryCode.css';
import '../styles/CenteredElementsCard.css';

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Link, useNavigate } from 'react-router-dom';
import { InputOtp } from 'primereact/inputotp';



const RecoveryCode = () => {
    const msgs = useRef(null);

    const navigate = useNavigate();

    const [recoveryCode, setRecoveryCode] = useState("");
    const [submit, setSubmit] = useState(false);

    const handleChange = (input) => {

        const { name, value } = input.target;
        setRecoveryCode(prevRecoveryCode => ({ ...prevRecoveryCode, [name]: value }));
    }

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
        } else if (codeRegistered == recoveryCode) {
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
            <Card className="card" title="Recuperar Senha">
                <div className="card-elements">
                    <label htmlFor="code" className="code">Código</label>
                    <div className="input-code">
                        <InputOtp 
                        className = "otp" 
                        integerOnly 
                        onChange={handleChange}
                        invalid={submit && !recoveryCode}/>
                    </div>
                    <Button
                    label="Enviar"
                    onClick={codeHandler}
                    />
                    <Link className="link-button-login" to="/recoveryPassword" >
                        <Button label="Voltar" />
                    </Link>
                </div>
            </Card>

        </div>
    );
}
export default RecoveryCode;
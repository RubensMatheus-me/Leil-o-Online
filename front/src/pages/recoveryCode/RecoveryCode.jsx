import React from "react";
import "./recoveryCode.css";
import '../styles/CenteredElementsCard.css';

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { InputOtp } from 'primereact/inputotp';



const RecoveryCode = () => {
    return (
        <div className="container">
            <Card className="card" title="Recuperar Senha">
                <div className="card-elements">
                    <label htmlFor="email">Código</label>
                    <div className="input-code">
                        <InputOtp className = "otp" integerOnly />
                    </div>
                    <Link className="link-button-login" to="/login" >
                        <Button label="Enviar" />
                    </Link>
                    <Link className="link-button-login" to="/recoveryPassword" >
                        <Button label="Voltar" />
                    </Link>
                </div>
            </Card>

        </div>
    );
}
export default RecoveryCode;
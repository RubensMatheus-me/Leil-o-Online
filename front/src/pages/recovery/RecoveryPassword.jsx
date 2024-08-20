import React, { useState } from "react";
import "./RecoveryPassword.css";
import '../styles/CenteredElementsCard.css';

import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';




const RecoveryPassword = () => {

    const [email, setEmail] = useState("");

    const [error, setError] = useState("");

    const handleRecoveryPassword = () => {
        if (!email) {
            setError("O email deve ser preenchido!");
            return;
        }
        setError("");
        alert("sucesso");
    }

    return (
        <div className="container">
            <Card className="card" title="Recuperar Senha">
                <div className="card-elements">      
                    <label htmlFor="email">Email</label>
                    <InputText id="email" type="email" value = {email} onChange={(e) => setEmail(e.target.value)}/>
                    
                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <Link className="link-button-login" to="/recoveryPassword/code" >
                        <Button label="Enviar" onCLick={handleRecoveryPassword} />
                    </Link> 
                    <Link className="link-button-login" to="/login" >
                        <Button label="Voltar" />
                    </Link> 
                </div>
            </Card>
           
    </div>
    );
}
export default RecoveryPassword;
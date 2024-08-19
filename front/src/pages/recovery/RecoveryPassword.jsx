import React from "react";
import "./RecoveryPassword.css";
import '../styles/CenteredElementsCard.css';

import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

const RecoveryPassword = () => {
    return (
        <div className="container">
            <Card className="card" title="Recuperar Senha">
                <div className="card-elements">      
                    <label htmlFor="email">Email</label>
                    <InputText id="email" type="email" />
                    <Button label="Enviar" />
                    <Link className="link-button-login" to="/login" >
                        <Button label="Voltar" />
                    </Link> 
                </div>
            </Card>
           
    </div>
    );
}
export default RecoveryPassword;
import React from "react";
import "./Register.css";
import '../styles/Card.css';

import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div>
            <Card className="card" title="Registro">
                <div className="card-elements">
                    <label htmlFor="Nome de usuário" placeholder="as">Nome</label>
                    <InputText />
                    <label htmlFor="email" placeholder="as">Email</label>
                    <InputText />
                    <label htmlFor="senha">Senha</label>
                    <Password feedback={true} toggleMask />

                    <label htmlFor="confirmarSenha">Confirmar Senha</label>
                    <Password feedback={false} toggleMask />
                    <Button className="button-login" label="Cadastrar" />
                    <Link className="link-button-login" to="/login" >
                        <Button label="Voltar" />
                    </Link> 
                </div>
            </Card>
        </div>
    );
}
export default Register;
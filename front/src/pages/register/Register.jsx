import React, { useState } from "react";
import "./Register.css";
import '../styles/CenteredElementsCard.css';

import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

const Register = () => {
    const [validateInput, setValidateInput] = useState( {
        case: false,
        number: false,
        length: false,
        specialChar: false
    });

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");

    const [username, setUsername] = useState("");

    const [email, setEmail] = useState("");

    const validatePassword = (password) => {
        const hasUpperCase = RegExp(/^(?=.*[A-Z]).+$/)
        const hasLowerCase = RegExp(/^(?=.*[a-z]).+$/)
        const hasNumber = RegExp(/^(?=.*[0-9]).+$/)
        const hasSpecialChar = RegExp(/^(?=.*[!@#$%^&*(),.?":{}|<>])/)
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
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleRegister = () => {
        if(password !== confirmPassword) {
            setError("As senhas são diferentes");
            return;
        }
        if (!username || !email || !password || !confirmPassword) {
            setError("Todos os campos devem ser preenchidos!");
            <InputText invalid/>
            return;
        }
        setError("");   

        localStorage.setItem("email", email);
        localStorage.setItem("password", password);

        alert("registro realizado com sucesso");
    }

   

    return (
        <div className="container">
            <Card className="card" title="Registro">
                <div className="card-elements">
                    <label htmlFor="Nome de usuário" placeholder="as">Nome</label>
                    <InputText value={username} onChange={(e) => setUsername(e.target.value)}/>

                    <label htmlFor="email" placeholder="as">Email</label>
                    <InputText value = {email} onChange={(e) => setEmail(e.target.value)}/>

                    <label htmlFor="senha">Senha</label>
                    <Password 
                    className="password-input" 
                    value={password}
                    header = {""}
                        footer={["Regras\n"] ["ds"]}
                    onChange={handlePasswordChange}
                    toggleMask/>

                    <label htmlFor="confirmarSenha">Confirmar Senha</label>
                    <Password 
                    className="password-input" 
                    feedback={false} 
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    toggleMask />

                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <div className="password-feedback">
                        <p>
                            A senha deve conter:
                        </p>
                        <p style={{ color: validateInput.case ? 'green' : 'red' }}>
                                {validateInput.case ? '✔' : '✖'} Deve conter letras maiúsculas e minúsculas
                            </p>
                            <p style={{ color: validateInput.number ? 'green' : 'red' }}>
                                {validateInput.number ? '✔' : '✖'} Deve conter pelo menos um número
                            </p>
                            <p style={{ color: validateInput.specialChar ? 'green' : 'red' }}>
                                {validateInput.specialChar ? '✔' : '✖'} Deve conter pelo menos um caractere especial
                            </p>
                            <p style={{ color: validateInput.length ? 'green' : 'red' }}>
                                {validateInput.length ? '✔' : '✖'} Deve ter pelo menos 6 caracteres
                            </p>
                    </div>

                    <Button className="button-login" label="Cadastrar" onClick={handleRegister} />

                    <Link className="link-button-login" to="/login" >
                        <Button label="Voltar" />
                    </Link> 
                </div>
            </Card>
        </div>
    );
}
export default Register;
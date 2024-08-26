import React, { useState, useRef } from "react";
import "./Register.css";
import '../styles/CenteredElementsCard.css';

import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { Messages } from 'primereact/messages';

const Register = () => {
    const [validateInput, setValidateInput] = useState({
        case: false,
        number: false,
        length: false,
        specialChar: false
    });

    const msgs = useRef(null);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const [submitted, setSubmitted] = useState(false);

    const validatePassword = (password) => {
        const hasUpperCase = RegExp(/^(?=.*[A-Z]).+$/);
        const hasLowerCase = RegExp(/^(?=.*[a-z]).+$/);
        const hasNumber = RegExp(/^(?=.*[0-9]).+$/);
        const hasSpecialChar = RegExp(/^(?=.*[!@#$%^&*(),.?":{}|<>])/);
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

    const handleRegister = () => {
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

        localStorage.setItem("email", email);
        localStorage.setItem("password", password);

        msgs.current.show({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Registro realizado com sucesso!',
            sticky: true,
        });
    };

    return (
        <div className="container">
            <div><Messages ref={msgs} /></div>
            <Card className="card" title="Registro">

                <div className="card-elements">
                    <label htmlFor="username">Nome</label>
                    <InputText
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        invalid={submitted && !username}
                    />

                    <label htmlFor="email">Email</label>
                    <InputText
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        invalid={submitted && !email}
                    />

                    <label htmlFor="senha">Senha</label>
                    <Password
                        id="senha"
                        className="password-input"
                        value={password}
                        header={null}
                        footer={
                            <div className="password-feedback">
                                <p>A senha deve conter:</p>
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
                        }
                        feedback={true}
                        onChange={handlePasswordChange}
                        toggleMask
                        invalid={submitted && !password}
                    />

                    <label htmlFor="confirmarSenha">Confirmar Senha</label>
                    <Password
                        id="confirmarSenha"
                        className="password-input"
                        feedback={false}
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        toggleMask
                        invalid={submitted && !confirmPassword}
                    />

                    

                    <Button className="button-login" label="Cadastrar" onClick={handleRegister} />

                    <Link className="link-button-login" to="/login">
                        <Button label="Voltar" />
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default Register;
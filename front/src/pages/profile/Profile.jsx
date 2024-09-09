import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import './Profile.css';
import { Password } from 'primereact/password';

const Profile = () => {
    const [username, setUsername] = useState("");
    const [avatar, setAvatar] = useState("https://via.placeholder.com/150");
    const [address, setAddress] = useState({ rua: '', cidade: '', estado: '', cep: '' });
    const [cpf, setCpf] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt`)
                    .then(response => response.json())
                    .then(data => {
                        setAddress({
                            rua: data.localityInfo.administrative[1]?.name || '', // Tentativa de obter a rua
                            cidade: data.city || data.locality || '',
                            estado: data.principalSubdivision || '',
                            cep: ''
                        });
                    });
            });
        }
    };

    const handleCepChange = (e) => {
        const cep = e.target.value;
        setAddress((prevAddress) => ({ ...prevAddress, cep }));
        if (cep.length === 8) { 
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    setAddress({
                        rua: data.logradouro,
                        cidade: data.localidade,
                        estado: data.uf,
                        cep: data.cep
                    });
                });
        }
    };

    const validateCpf = (cpf) => {
        cpf = cpf.replace(/[^\d]+/g, ''); 
        if (cpf.length !== 11) return false;

        let sum = 0;
        let remainder;
        for (let i = 1; i <= 9; i++) {
            sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.substring(9, 10))) return false;

        sum = 0;
        for (let i = 1; i <= 10; i++) {
            sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.substring(10, 11))) return false;

        return true;
    };

    return (
        <div className="profile-container">
            <Card className='main-card'>
                <label htmlFor="username">Bem-vindo, {username || 'Usuário'}</label>
                <div className='image'>
                    <Avatar
                        image={avatar}
                        size="xlarge"
                        shape="circle"
                        className="avatarImage"
                    />
                    <label htmlFor="upload-avatar" className='upload-button'>Inserir Foto de Perfil</label>
                    <div className='file-input-container'>
                        <input
                            type="file"
                            id="upload-avatar"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setAvatar(reader.result);
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="separator">
                    <span>Configurações</span>
                </div>
                <div className='user-info'>
                    <div className='info-values'>
                        <p>Nome:</p>
                        <InputText className="username" placeholder="Digite seu novo nome" />
                        <p>Email:</p>
                        <InputText className="email" placeholder="Digite seu novo email" />
                        <p>CPF:</p>
                        <InputText
                            className="cpf"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                            placeholder="Digite seu CPF"
                            onBlur={() => {
                                if (!validateCpf(cpf)) {
                                    alert("CPF inválido!");
                                }
                            }}
                        />
                    </div>
                    <div className="separator">
                        <span>Mudar senha</span>
                    </div>
                    <div className='info-values'>
                        <p>Senha atual:</p>
                        <Password className="password-profile" placeholder="••••••" />
                        <p>Nova senha:</p>
                        <Password className="password-profile" placeholder="••••••" />
                        <p>Confirme a nova senha:</p>
                        <Password className="password-profile" placeholder="••••••" />
                    </div>
                    <div className="separator">
                        <span>Endereço</span>
                    </div>
                    <div className='adress-button-container'>
                        <Button className='adress-button' label="Usar minha localização" onClick={getLocation} />
                    </div>

                    <div className='address-values'>
                        <p>CEP:</p>
                        <InputText value={address.cep} onChange={handleCepChange} placeholder="Digite o CEP" />
                        <p>Rua:</p>
                        <InputText value={address.rua} onChange={(e) => setAddress({ ...address, rua: e.target.value })} placeholder="Digite a rua" />
                        <p>Cidade:</p>
                        <InputText value={address.cidade} onChange={(e) => setAddress({ ...address, cidade: e.target.value })} placeholder="Digite a cidade" />
                        <p>Estado:</p>
                        <InputText value={address.estado} onChange={(e) => setAddress({ ...address, estado: e.target.value })} placeholder="Digite o estado" />
                    </div>
                </div>
                <div>
                    <Button className='save-button' label='Salvar Alterações' />
                </div>
            </Card>
        </div>
    );
};

export default Profile;

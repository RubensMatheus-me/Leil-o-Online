import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';
import { InputText } from 'primereact/inputtext';
import './Profile.css';

const Profile = () => {
    const [username, setUsername] = useState("");
    const [avatar, setAvatar] = useState("https://via.placeholder.com/150"); // URL padrão para o avatar

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    return (
        <div className="container">
            <Card className='cardAvatar'>
                <Avatar
                    image={avatar}
                    size="xlarge"
                    shape="circle"
                    className="avatarImage"
                />
                <label htmlFor="upload-avatar">Inserir Foto de Perfil</label>

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
            </Card>
            <Card className='cardInformations'>
                <label htmlFor="username">Bem-vindo, {username || 'Usuário'}</label>
                <InputText id="username" placeholder="Digite seu nome" />
            </Card>
        </div>
    );
};

export default Profile;

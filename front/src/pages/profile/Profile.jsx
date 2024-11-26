import React, { useEffect, useState, useRef } from 'react';
import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useTranslation } from "react-i18next";
import { Messages } from 'primereact/messages';
import './Profile.css';

const Profile = () => {
    const [username, setUsername] = useState("");
    const [avatar, setAvatar] = useState("https://via.placeholder.com/150");
    const [address, setAddress] = useState({ rua: '', cidade: '', estado: '', cep: '' });
    const [cpf, setCpf] = useState('');
    const [cpfError, setCpfError] = useState('');
    const { t } = useTranslation();
    const msgs = useRef(null);

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
                            rua: data.localityInfo.administrative[1]?.name || '',
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

    const handleCpfChange = (e) => {
        const newCpf = e.target.value.replace(/[^\d]/g, ''); // Remove caracteres não numéricos
        setCpf(newCpf);
    };

    const handleCpfBlur = () => {
        if (!validateCpf(cpf)) {
            msgs.current.show({
                severity: 'error',
                summary: 'Erro',
                detail: t('profile.error-message-cpf'),
                sticky: true,
            });
        }else {
            msgs.current.show({
                severity: 'success',
                summary: 'Sucesso',
                detail: t('profile.valid-message-cpf'),
                sticky: true,
            });
        }
    };

    return (
        <div className="profile-container">
            <div className="notification">
                <Messages className="notification-message" ref={msgs} />
            </div>
            <Card className='main-card'>
                <label htmlFor="username">{t('profile.welcome')} {username || 'Usuário'}</label>
                <div className='image'>
                    <Avatar
                        image={avatar}
                        size="xlarge"
                        shape="circle"
                        className="avatarImage"
                    />
                    <label htmlFor="upload-avatar" className='upload-button'>{t('profile.picture')}</label>
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
                    <span>{t('profile.settings')}</span>
                </div>
                <div className='user-info'>
                    <div className='info-values'>
                        <p>{t('profile.name')}</p>
                        <InputText className="username" placeholder={t('profile.placeholder-name')} value={username} onChange={(e) => setUsername(e.target.value)} />
                        <p>{t('profile.email')}</p>
                        <InputText className="email" placeholder={t('profile.placeholder-email')} />
                        <p>{t('profile.cpf')}</p>
                        <InputText
                            className={`cpf ${cpfError ? 'p-invalid' : ''}`}
                            value={cpf}
                            onChange={handleCpfChange}
                            placeholder={t('profile.placeholder-cpf')}
                            maxLength={11}
                            onBlur={handleCpfBlur}
                        />
                        {cpfError && <small className="p-error">{cpfError}</small>}
                    </div>
                    <div className="separator">
                        <span>{t('profile.change-password')}</span>
                    </div>
                    <div className='info-values'>
                        <p>{t('profile.actual-password')}</p>
                        <Password className="password-profile" placeholder="••••••" />
                        <p>{t('profile.new-password')}</p>
                        <Password className="password-profile" placeholder="••••••" />
                        <p>{t('profile.confirm-password')}</p>
                        <Password className="password-profile" placeholder="••••••" />
                    </div>
                    <div className="separator">
                        <span>{t('profile.adress')}</span>
                    </div>
                    <div className='adress-button-container'>
                        <Button className='adress-button' label={t('profile.locale')} onClick={getLocation} />
                    </div>

                    <div className='address-values'>
                        <p>{t('profile.cep')}</p>
                        <InputText value={address.cep} onChange={handleCepChange} placeholder={t('profile.placeholder-cep')} />
                        <p>{t('profile.street')}</p>
                        <InputText value={address.rua} onChange={(e) => setAddress({ ...address, rua: e.target.value })} placeholder={t('profile.placeholder-street')} />
                        <p>{t('profile.city')}</p>
                        <InputText value={address.cidade} onChange={(e) => setAddress({ ...address, cidade: e.target.value })} placeholder={t('profile.placeholder-city')} />
                        <p>{t('profile.state')}</p>
                        <InputText value={address.estado} onChange={(e) => setAddress({ ...address, estado: e.target.value })} placeholder={t('profile.placeholder-state')} />
                    </div>
                </div>
                <div>
                    <Button className='save-button' label={t('profile.save')} />
                </div>
            </Card>
        </div>
    );
};

export default Profile;

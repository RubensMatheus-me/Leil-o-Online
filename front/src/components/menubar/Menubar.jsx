import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import { useNavigate } from "react-router-dom";
import './Menubar.css';
import AvatarSettings from '../avatarSettings/AvatarSettings';
import { useTranslation } from "react-i18next";

export default function TemplateDemo() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [currentLang, setCurrentLang] = useState(i18n.language);

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        setCurrentLang(language);
    }

    const handleHome = () => {
        navigate("/");
    }
    const handleMyItems = () => {
        navigate("/my-items");
    }
    const toggleLanguage = () => {
        const newLang = currentLang === 'pt' ? 'en' : 'pt';
        changeLanguage(newLang);
    }

    const itemRenderer = (item) => (
        <a className="flex align-items-center p-menuitem-link" onClick={item.command}>
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    );

    const items = [
        {
            label: 'Inicio',
            icon: 'pi pi-home',
            command: handleHome,
        },
        {
            label: 'Meus Items',
            icon: 'pi pi-star',
            command: handleMyItems,
        },
        {
            label: currentLang === 'pt' ? 'PT-BR' : 'EN-US',
            icon: 'pi pi-globe',
            template: itemRenderer,
            command: toggleLanguage,
        }
    ];

    const end = (
        <div className='endBar'>
            <div className="flex align-items-center gap-2">
                <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" />
                <AvatarSettings />
            </div>
        </div>
    );

    return (
        <div className="card">
            <Menubar model={items} end={end} />
        </div>
    );
}

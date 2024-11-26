import React, { useState } from "react";
import { Button } from 'primereact/button';
import { useTranslation } from "react-i18next";
import './ButtonLanguage.module.css'; // Estilo personalizado

const ButtonLanguage = () => {
    const { i18n } = useTranslation();
    const [currentLang, setCurrentLang] = useState(i18n.language);

    const handleIconClick = () => {
        const newLang = currentLang === 'pt' ? 'en' : 'pt';
        i18n.changeLanguage(newLang);
        setCurrentLang(newLang);
    };

    return (
        <Button 
            icon="pi pi-globe"
            className="language-switcher-button"
            onClick={handleIconClick}
            tooltip={currentLang === 'pt' ? 'Switch to English' : 'Mudar para Português'}
        />
    );
}

export default ButtonLanguage;

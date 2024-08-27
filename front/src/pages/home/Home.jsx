import React from "react";
import "./Home.css";    
import {useTranslation} from "react-i18next";

const Home = () => {
    const {t,i18n} = useTranslation();
    
    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    }

    return (
        <div>
            <h1>{t('welcome')}</h1>
            <button onClick={() => changeLanguage('en')}>English</button>
            <button onClick={() => changeLanguage('pt')}>Português</button>
            <div>
                
            </div>
        </div>
    );
}
export default Home;
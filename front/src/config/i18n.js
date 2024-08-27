import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import pt from './locales/pt-br.json';
import en from './locales/en.json';

const resources = {
    en: {
        translation: {
            welcome: "Welcome",
        },
    },
    pt: {
        translation: pt,
    },
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'pt',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;

import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const languages = ['en', 'ru', 'ge'];

i18n
  // .use(Backend)
  // .use(LanguageDetector)
  // .use(initReactI18next)
  .init({
    // supportedLngs: languages,
    // fallbackLng: 'ge',
    // lng: 'ge',
    // debug: false,
    // react: {
    //   useSuspense: false,
    // },
    // backend: {
    //   loadPath: '/public/locales/{{lng}}/common.json',
    // },
    // detection: {
    //   order: ['localStorage', 'cookie'],
    //   caches: ['cookie', 'localStorage'],
    // },
  });

export default i18n;
